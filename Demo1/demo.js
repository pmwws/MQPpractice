var win_size_dom = document.querySelector('.window_size');
var points = [[0,0], [200,200], [115, 35], [88, 99]];
var s = document.getElementById('s');
var command = 'M ' + points[0][0] + " " + points[0][1] + " ";
var path = document.getElementById("path");

var win_size = {
    width: document.getElementById('a').style.width,
    height: document.getElementById('a').style.height
};

var initialStatus = {
    targets: win_size,
    width: 400,
    height: 600,
    round: 1,
    easing: 'linear',
    update: function() {
        win_size_dom.innerHTML = win_size.width + ' * ' + win_size.height;
    },
    duration: 800
};
var fullScreen = {
    targets: '.window',
    left: '0px',
    width: '1400px',
    height: '700px',
    duration: 300,
    offset: '+=1000'
};
var leftHalfScreen = {
    targets: '.window',
    left: '0px',
    width: '700px',
    height: '700px',
    duration: 300,
    offset: '+=1000'
};
var rightHalfScreen = {
    targets: '.window',
    left: '700px',
    duration: 300,
    offset: '+=1000'
};
var randomPosition1 = {
    targets: '.window',
    width: '200px',
    height: '200px',
    duration: 300,
    offset: '+=1000'
};
var randomPosition2 = {
    targets: '.window',
    left: '200px',
    duration: 300,
    offset: '+=1000',

};

var win_sizeChange_fullScreen = {
    targets: win_size,
    width: 1400,
    height: 700,
    round: 1,
    easing: 'linear',
    update: function() {
        win_size_dom.innerHTML = win_size.width + ' * ' + win_size.height;
    }
};
var win_sizeChange_halfScreen = {
    targets: win_size,
    width: 700,
    height: 700,
    round: 1,
    easing: 'linear',
    update: function() {
        win_size_dom.innerHTML = win_size.width + ' * ' + win_size.height;
    }
};
var win_sizeChange_200Screen = {
    targets: win_size,
    width: 200,
    height: 200,
    round: 1,
    easing: 'linear',
    update: function() {
        win_size_dom.innerHTML = win_size.width + ' * ' + win_size.height;
    }
};

var mouse_path = {
    targets: "path",
    d: function() {
        len = points.length;
        for(var i = 1; i < len; i++){
            x1 = points[i][0];
            y1 = points[i][1];
            var newCommand = 'L ' +  x1 + " " + y1 + " ";
            command = command.concat(newCommand);
        }
        path.setAttribute("d", command);
    },
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInQuad",
    duration: 4500,
};

var seekProgress = document.querySelector('.progress');
const tl = anime.timeline({
    autoplay: false,
    easing: 'easeInOutQuad',
    update: function(anim) {
        seekProgress.value = tl.progress;
    }
});

tl.add(initialStatus)
    .add(fullScreen)
    .add(win_sizeChange_fullScreen)
    .add(leftHalfScreen)
    .add(win_sizeChange_halfScreen)
    .add(rightHalfScreen)
    .add(randomPosition1)
    .add(win_sizeChange_200Screen)
    .add(mouse_path)
    .add(randomPosition2)
;

seekProgress.oninput = function() {
    tl.seek(tl.duration * (seekProgress.value / 100));
};
document.getElementById('restart').onclick = tl.restart;

document.getElementById('play').onclick = toggleButton;

function toggleButton() {
    let x = document.getElementById("play");
    if (x.innerHTML === 'Play') {
        x.innerHTML = 'Pause';
        tl.play();
        console.log(x.innerHTML);
    }
    else if(x.innerHTML === 'Pause'){
        x.innerHTML = 'Play';
        tl.pause();
        console.log(x.innerHTML)
    }
}

