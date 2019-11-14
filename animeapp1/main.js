var playButton = document.querySelector('.play');
var pauseButton = document.querySelector('.pause');
var progress = document.querySelector('.progress');
var playPause = anime({
    targets: 'div.box',
    translateY: [
        {value: 100, duration: 500},
        {value: 0, duration: 800}
    ],
    rotate: {
        value: '1turn',
        easing: 'easeInOutSine'
    },
    delay: function(el, i, l){
        return i * 1000
    },
    autoplay: true,
    loop: true,
    update: function(animation){
        progress.value = animation.progress;
    }
});

playButton.addEventListener('click', function() { playPause.play(); });
pauseButton.addEventListener('click', function() { playPause.pause(); });
progress.addEventListener('input', function() { playPause.seek(progress.value); });

/*
document.querySelector('#boxes .play').onclick = playPause.play;
document.querySelector('#boxes .pause').onclick = playPause.pause;*/