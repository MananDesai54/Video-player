document.querySelector('input').addEventListener('change',(event)=>{
    console.log(event.target.files[0].name);
    event.target.parentElement.classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    document.querySelector('video').src = event.target.files[0].name;
})
let video = document.querySelector('video');
let start = document.querySelector('.play');
let stop = document.querySelector('.stop');
let timeBar = document.querySelector('input[type="range"]');
let time = document.querySelector('.time');
let sound = document.querySelector('.mute');

function toggleVideoState() {
    if(video.paused) {
        video.play();
    }else {
        video.pause();
    }
}

function updatePlayicon() {
    if(video.paused) {
        start.innerHTML = '<i class="fas fa-play fa-2x"></i>'
    }else {
        start.innerHTML = '<i class="fas fa-pause fa-2x"></i>'
    }
}

function updateProgress() {
    timeBar.value = (video.currentTime/video.duration)*100;

    let mins = Math.floor(video.currentTime/60);
    if(mins<10) {
        mins = '0' + String(mins);
    }
    let secs = Math.floor(video.currentTime%60);
    if(secs<10) {
        secs = '0' + String(secs);
    }
    time.innerHTML = `${mins}:${secs}`
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

function setVideoProgress() {
    console.log((+timeBar.value/video.duration)*100)
    video.currentTime = (+timeBar.value*video.duration)/100;
    //updateProgress();
}

function toggleSound() {
    if(video.muted) {
        video.muted = false;
        sound.innerHTML = '<i class="fas fa-volume-up fa-2x"></i>'
    } else {
        video.muted = true;
        sound.innerHTML = '<i class="fas fa-volume-mute fa-2x"></i>'
    }
}

video.addEventListener('click',toggleVideoState);
video.addEventListener('play',updatePlayicon);
video.addEventListener('pause',updatePlayicon);
video.addEventListener('timeupdate',updateProgress);

start.addEventListener('click',toggleVideoState);
stop.addEventListener('click',stopVideo);
timeBar.addEventListener('change',setVideoProgress);

sound.addEventListener('click',toggleSound);