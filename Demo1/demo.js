var win_size_dom = document.querySelector('.window_size');
var points = [
    [27,183],
    [30,172],
    [34,159],
    [36,145],
    [38,131],
    [39,125],
    [39,114],
    [39,110],
    [39,104],
    [39,100],
    [39,197],
    [39,195],
    [38,194],
    [38,193],
    [38,193],
    [38,115],
    [45,155],
    [52,106],
    [82,119],
    [39,113],
    [10,105],
    [7,158],
    [15,71],
];
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
    for (i = 0; i < 50; i++){
        if(Math.random() > 0.5){
            width = Math.ceil(Math.random() * 50);
            key = Math.ceil(Math.random() *3);
            keystrokes.push(new keystroke(key, i*20, i*20 + width));
        }
        
    }    
}
document.getElementById("Add").onclick = function keys(){
    generator();
    keybox = document.getElementById("keyboard");
    end = 1000;
    lastEnd = 0;
    maxEnd = 0
    level = 0;
    maxLevel = 0;
    console.log("WIDTH " + keybox.clientWidth);
    for(stroke of keystrokes){ 
        start = ((stroke.start * keybox.clientWidth)/end) - lastEnd;
        width = (stroke.width * keybox.clientWidth)/end;

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
        if(stroke.key === 1){
            box.style.backgroundColor = "blue";
        }else if(stroke.key === 2){
            box.style.backgroundColor = "red";
        }else{
            box.style.backgroundColor = "teal";
        }
        

        keybox.appendChild(box);
        lastEnd = start + width;
        if(maxEnd < lastEnd){
            maxEnd = lastEnd;
        }
        if(level > maxLevel){
            maxLevel = level;
        }
    }
    keybox.style.height = (maxLevel + 2) *10 + "px";
};
