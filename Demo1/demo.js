var win_size_dom = document.querySelector('.window_size');

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
    .add(randomPosition2);

seekProgress.oninput = function() {
    tl.seek(tl.duration * (seekProgress.value / 100));
};
document.getElementById('restart').onclick = tl.restart;

document.getElementById('play').onclick = toggleButton;

function toggleButton() {
    let x = document.getElementById("play");
    if (x.innerHTML === 'play') {
        x.innerHTML = 'pause';
        tl.play();
        console.log(x.innerHTML);
    }
    else if(x.innerHTML === 'pause'){
        x.innerHTML = 'play';
        tl.pause();
        console.log(x.innerHTML)
    }
}

//mouse
// add mouse move listener
var s = document.getElementById('s');
var points = [[110,10], [110,10],[300, 400], [115, 35], [88, 99]];
var itvHandleRE;
var index = 0;
const reDrawInterval = 30;

function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
        el.setAttribute(k, attrs[k]);
    }
    return el;
}

function createPath(x0, y0, x1, y1, svg) {
    x1 = x1-x0;
    y1 = y1-y0;
    var string = 'm ' + x0 +" "+ y0 + 'l ' + x1 + " " + y1;
    var path = makeSVG('path', {d: string, 'className': 'path', stroke: 'black'});
    svg.appendChild(path)
}

function drawOnePoint( i ) {
    x1 = points[i][0];
    y1 = points[i][1];
    x2 = points[i + 1][0];
    y2 = points[i + 1][1];
    createPath(x1, y1, x2, y2, s);
}

function drawPath() {
    drawOnePoint(index);
    index = index + 1;
    if (index === points.length -1) {
        clearInterval(itvHandleRE);
        itvHandleRE = null;
        index =0;
    }
}

function draw() {
    itvHandleRE = setInterval(drawPath , reDrawInterval);
}