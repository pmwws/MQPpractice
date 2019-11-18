var s = document.getElementById('s');
var s2 = document.getElementById('s2');
var prevX, prevY, curX, curY;
var itvHandle , itvHandleRE;
var points = Array();
var index = 0;
const drawInterval = 20;
const reDrawInterval = 30;

// add mouse move listener
s.addEventListener("mousemove" , function(){mouseUpdate(event)});
s.addEventListener("click" , function(){mouseClickToggle(event)});

function mouseUpdate(e) {
    curX = e.clientX;
    curY = e.clientY;
}

function startRecord() {
    points.push([prevX, prevY]);
    createPath(prevX, prevY,curX,curY, s);
    prevX = curX;
    prevY = curY;
}

function startDrawing() {
    prevX = curX;
    prevY = curY;
    itvHandle = setInterval(startRecord, drawInterval);
}

function reDraw() {
    itvHandleRE = setInterval(reDrawPath , reDrawInterval);
}

function reDrawPath() {
    reDraw1Point(index);
    index = index + 1;
    if (index === points.length -1) {
        clearInterval(itvHandleRE);
        itvHandleRE = null;
        index =0;
    }
}

function reDraw1Point( i ) {
    x1 = points[i][0];
    y1 = points[i][1];
    x2 = points[i + 1][0];
    y2 = points[i + 1][1];
    createPath(x1, y1, x2, y2, s2);
}

//function to make SVG by given tag and attributes
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

function stopDrawing() {
    clearInterval(itvHandle);
    itvHandle = null;
}

function mouseClickToggle() {
    if(itvHandle == null) {
        startDrawing();
        return 0;
    }
    stopDrawing();
}