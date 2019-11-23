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

class keystroke{
    constructor(key, start, end){
        this.key = key;
        this.start = start;
        this.end = end;
        this.width = end - start;
    }
}
var keystrokes = [];
function generator(){
    var i;
    for (i = 0; i < 20; i++){
        if(Math.random() > 0.5){
            width = Math.ceil(Math.random() * 50);
            key = Math.random() *3;
            keystrokes.push(new keystroke(key, i*20, i*20 + width));
        }
        
    }    
}
document.getElementById("Add").onclick = function keys(){
    generator();
    keybox = document.getElementById("keyboard");
    end = 450;
    lastEnd = 0;
    maxEnd = 0
    level = 0;
    maxLevel = 0;
    for(stroke of keystrokes){ 
        start = ((stroke.start * keybox.clientWidth)/end) - maxEnd;
        width = (stroke.width * keybox.clientWidth)/end;
        console.log(lastEnd + " | " + start);
        if(start < 0){
            level++;
        }else if(level > 0){
            level = 0;
        }
        height = level * 10;
        box = document.createElement("div");
        box.setAttribute("class", "box");
        box.style.position = "relative";
        box.style.top = height + "px"; 
        box.style.left = start + "px";
        box.style.width = width + "px";

        keybox.appendChild(box);
        if(maxEnd < (stroke.end * keybox.clientWidth)/end){
            maxEnd = (stroke.end * keybox.clientWidth)/end;
        }
        if(level > maxLevel){
            maxLevel = level;
        }
    }
    keybox.style.height = (maxLevel + 2) *10 + "px";
};