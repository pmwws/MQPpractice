var win_size_dom = document.querySelector('.window_size');
var points1 = [
    [127,183],
    [130,172],
    [134,159],
    [136,145],
    [138,131],
    [139, 145],
    [140, 146],
    [150, 148],
];

var points2 = [
    [150, 148],
    [140, 129],
    [138,131],
    [139,114],
    [139,110],
    [125,104],
    [139,100],
    [168,197],
    [199,195],
    [177,194],
];

var points3 = [
    [177,194],
    [168,190],
    [138,193],
    [138,193],
    [138,115],
    [145,155],
    [152,106],
    [182,119],
    [139,113],
    [110,105],
    [17,158],
    [115,71],
];

var clicks1 = [
    [150,148],
];

var clicks2 = [
    [177,194],
];

var clicks3 = [
    [115,71],
];

var s = document.getElementById('s');
var command1 = 'M ' + points1[0][0] + " " + points1[0][1] + " ";
var command2 = 'M ' + points2[0][0] + " " + points2[0][1] + " ";
var command3 = 'M ' + points3[0][0] + " " + points3[0][1] + " ";

var path1 = document.getElementById("path1");
var path2 = document.getElementById("path2");
var path3 = document.getElementById("path3");

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
    offset: '+=1000',
};
var leftHalfScreen = {
    targets: '.window',
    left: '0px',
    width: '700px',
    height: '700px',
    duration: 300,
    offset: '+=1000',

};
var rightHalfScreen = {
    targets: '.window',
    left: '700px',
    duration: 300,
    offset: '+=1000',
};
var randomPosition1 = {
    targets: '.window',
    width: '200px',
    height: '200px',
    duration: 300,
    offset: '+=1000',
    complete: function() {
        let circles = document.getElementsByTagName("circle");
        s.removeChild(path1);
        s.removeChild(path2);
        s.removeChild(path3);
        while(circles.length !== 0){
            s.removeChild(circles[0]);
        }
    }
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

//mouse movement
var mouse_path1 = {
    targets: path1,
    d: function() {
        len = points1.length;
        for(var i = 1; i < len; i++){
            x1 = points1[i][0];
            y1 = points1[i][1];
            var newCommand = 'L ' +  x1 + " " + y1 + " ";
            command1 = command1.concat(newCommand);
        }
        path1.setAttribute("d", command1);
    },
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInQuad",
    duration: 4500,
};

var mouse_path2 = {
    targets: path2,
    d: function() {
        len = points2.length;
        for(var i = 1; i < len; i++){
            x1 = points2[i][0];
            y1 = points2[i][1];
            var newCommand = 'L ' +  x1 + " " + y1 + " ";
            command2 = command2.concat(newCommand);
        }
        path2.setAttribute("d", command2);
    },
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInQuad",
    duration: 4500,
};

var mouse_path3 = {
    targets: path3,
    d: function() {
        len = points3.length;
        for(var i = 1; i < len; i++){
            x1 = points3[i][0];
            y1 = points3[i][1];
            var newCommand = 'L ' +  x1 + " " + y1 + " ";
            command3 = command3.concat(newCommand);
        }
        path3.setAttribute("d", command3);
    },
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInQuad",
    duration: 4500,
};

//mouse clicks
function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
        el.setAttribute(k, attrs[k]);
    }
    return el;
}

var mouse_click1 = {
    targets: "s",
    complete: function() {
        len = clicks1.length;
        for(var i = 0; i < len; i++) {
            pos_x = clicks1[i][0];
            pos_y = clicks1[i][1];
            var click = makeSVG('circle', {cx: pos_x, cy: pos_y, r: '3',  stroke: '#fcc203', fill: '#fcc203'});
            s.appendChild(click);
        }
    },
};

var mouse_click2 = {
    targets: "s",
    complete: function() {
        len = clicks2.length;
        for(var i = 0; i < len; i++) {
            pos_x = clicks2[i][0];
            pos_y = clicks2[i][1];
            var click = makeSVG('circle', {cx: pos_x, cy: pos_y, r: '3',  stroke: '#fcc203', fill:'#fcc203'});
            s.appendChild(click);
        }
    },
};

var mouse_click3 = {
    targets: "s",
    complete: function() {
        len = clicks3.length;
        for(var i = 0; i < len; i++) {
            pos_x = clicks3[i][0];
            pos_y = clicks3[i][1];
            var click = makeSVG('circle', {cx: pos_x, cy: pos_y, r: '3',  stroke: '#fcc203', fill: '#fcc203'});
            s.appendChild(click);
        }
    },
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
    .add(mouse_path1)
    .add(mouse_click1)
    .add(mouse_path2)
    .add(mouse_click2)
    .add(mouse_path3)
    .add(mouse_click3)
    .add(randomPosition1)
    .add(win_sizeChange_200Screen)
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
    maxEnd = 0;
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
            box.style.backgroundColor = "#8DD3C7";
        }else if(stroke.key === 2){
            box.style.backgroundColor = "#FFFFB3";
        }else{
            box.style.backgroundColor = "#BEBADA";
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

//
// document.getElementById("openFile").addEventListener('change', function(){
//     var fr = new FileReader();
//     fr.onload = function () {
//         document.getElementById("fileContents").textContent = this.result;
//     };
//     fr.readAsText(this.files[0])
// });
var jstring;
document.getElementById('upload').addEventListener('change', readFileAsString)
function readFileAsString() {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        jstring = event.target.result;
        //console.log('File content:', jstring);
        var indata = JSON.parse(jstring);
        console.log(indata);
    };
    reader.readAsText(files[0]);
}


