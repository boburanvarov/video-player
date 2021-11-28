const play = document.querySelector('.controll-buttons .fa-play');
const pause = document.querySelector('.controll-buttons .fa-pause');
const stop = document.querySelector('.stop');
const speedUp = document.querySelector('.speed-up');
const volume = document.querySelector('input[type="range"]');
const volumeIndicator = document.querySelector('.volume');
const progress = document.querySelector('.video-progress');
const progressBar = document.querySelector('.progress-filled');
const video = document.querySelector('video');
const blockPlay = document.querySelector('.block-play');
const blockInPlayed = document.querySelector('.block-play .fa-play');
const blockInPaused = document.querySelector('.block-play .fa-pause');
const mute = document.querySelector('.mute');
const next = document.querySelector('.fa-fast-forward');
const prev = document.querySelector('.fa-fast-backward');
const videoTitle = document.querySelector('.video-name');
const videoUrl = document.querySelector('.video-url');
const currentText = document.querySelector('.current-time');
const durationText = document.querySelector('.duration-time');



const videos = [{
        video: 'Крепкий-орешек-4 -Трейлер-HD.mp4',
        videoName: 'Крепкий орешек-4 ',
        url: 'https://hdrezka.re/boeviki/4796-live-free-or-die-hard.html'
    },
    {
        video: 'Хакер-(2016)Русский -трейлер.mp4',
        videoName: 'Хакер-(2016)',
        url: 'https://www.youtube.com/watch?v=Z0-0zvVILBs'
    },
    {
        video: 'facebook.mp4',
        videoName: 'Facebook',
        url: 'https://gidonline.io/film/socialnaya-set/'
    },
    {
        video: 'apple.mp4',
        videoName: 'Apple',
        url: 'https://www.youtube.com/watch?v=M9JHYTqcZng'
    },
    {
        video: 'Сноуден(2016).mp4',
        videoName: 'Сноуден-(2016)',
        url: 'https://rezka.ag/films/thriller/13890-snouden-2016.html'
    }
];
let videosCount = 0;

function videoInfo() {
    video.src = 'videos/' + videos[videosCount].video;
    videoTitle.innerHTML = videos[videosCount].videoName;
    videoUrl.setAttribute('href', videos[videosCount].url);
    videoUrl.innerHTML = videos[videosCount].url;
}

videoInfo()

next.addEventListener('click', () => {
    videosCount++
    videoInfo();
    video.play();
    played();

    if (videosCount + 1 === videos.length) {
        next.style.opacity = '0';
        next.style.pointerEvents = 'none';
    }

    if (videosCount === 1) {
        prev.style.opacity = '1'
        prev.style.pointerEvents = 'auto'
    }
})

prev.addEventListener('click', () => {

    videosCount--
    videoInfo();
    video.play()
    played()

    if (videosCount === 0) {
        prev.style.opacity = '0'
        prev.style.pointerEvents = 'none'
    }

    if (videosCount < videos.length) {
        next.style.opacity = '1';
        next.style.pointerEvents = 'auto';
    }

})


function played() {
    play.classList.remove('active');
    pause.classList.add('active');

}

function paused() {
    play.classList.add('active');
    pause.classList.remove('active');
}

blockPlay

function blockPlayed() {
    if (play.classList.contains('active')) {
        playy();
        blockPlay.style.transition = '1s'
        blockPlay.style.opacity = '1';
        blockInPlayed.style.display = 'block';
        blockInPaused.style.display = 'none';

    } else if (pause.classList.contains('active')) {
        pausedd();
        blockPlay.style.transition = '1s'
        blockPlay.style.opacity = '1';
        blockInPlayed.style.display = 'none';
        blockInPaused.style.display = 'block';
    }
    animatplay = setTimeout(function() {
        blockPlay.style.transition = '2s'
        blockPlay.style.opacity = '0';
    }, 500)

}

video.addEventListener('click', blockPlayed);
blockPlay.addEventListener('click', blockPlayed);

// play
play.addEventListener('click', playy);

function playy() {
    video.play();
    played()
}


// pause
pause.addEventListener('click', pausedd);

function pausedd() {
    video.pause();
    paused()
}

// stop
stop.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    paused();
});

// speedUp
let speedCount = 1;
speedUp.addEventListener('click', () => {


    video.playbackRate = speedCount;
    speedCount += speedCount;
    if (speedCount === 2) {
        speedUp.textContent = '2x';
        speedUp.classList.add('active');
    } else if (speedCount === 4) {
        speedUp.textContent = '4x';
        speedUp.classList.add('active');
    } else if (speedCount === 8) {
        speedUp.textContent = '8x';
        speedUp.classList.add('active');
    } else if (speedCount === 16) {
        speedUp.textContent = '16x';
        speedUp.classList.add('active');
    } else {
        speedCount = 1;
        video.playbackRate = speedCount;
        speedUp.textContent = '2x';
        speedUp.classList.remove('active');
    }
    video.play();
    played();
})

// volume

volume.addEventListener('input', () => {
    const volumeValue = volume.value;
    volumeIndicator.textContent = volumeValue + '%';
    video.volume = volumeValue / 100;

    if (volumeValue == 0) {
        mute.classList.remove('fa-volume-up');
        mute.classList.add('fa-volume-mute');
    } else {
        mute.classList.add('fa-volume-up');
        mute.classList.remove('fa-volume-mute');
    }
})

mute.addEventListener('click', () => {
    mute.classList.toggle('muted');

    if (mute.classList.contains('muted')) {
        video.volume = 0;
        mute.classList.remove('fa-volume-up');
        mute.classList.add('fa-volume-mute');
    } else {
        video.volume = volume.value / 100;
        mute.classList.add('fa-volume-up');
        mute.classList.remove('fa-volume-mute');
    }
})

// timeZone






function currentTime() {

    const current = video.currentTime;
    const duration = video.duration;

    let currentMinutes = Math.floor(current / 60);
    let currentSeconds = Math.floor(current - currentMinutes * 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration - durationMinutes * 60);


    currentText.innerHTML = `${currentMinutes}:${currentSeconds<10 ? '0' + currentSeconds : currentSeconds}`;

    if (isNaN(duration)) {
        durationText.innerHTML = '0:00'
    } else {
        durationText.innerHTML = `${durationMinutes}:${durationSeconds}`;
    }
}
video.addEventListener('timeupdate', currentTime);
// progress
video.addEventListener('timeupdate', () => {
    const current = video.currentTime;
    const duration = video.duration;
    const percentage = (current / duration) * 100;
    progressBar.style.width = `${percentage}%`;
})



progress.addEventListener('click', e => {
    const progressWidth = progress.offsetWidth;
    const clicked = e.offsetX;
    video.currentTime = (clicked / progressWidth) * video.duration;
})

// end
video.addEventListener('pause', () => {
    if (video.currentTime === video.duration) {
        video.currentTime = 0;
        paused();
    }
})