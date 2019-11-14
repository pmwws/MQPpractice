var s = document.getElementById('s');
var prevX, prevY, curX, curY, itvHandle ;

const drawInterval = 20;

// add mouse move listener
s.addEventListener("mousemove" , function(){mouseUpdate(event)});
s.addEventListener("click" , function(){mouseClickToggle(event)});


//function to make SVG by given tag and attributes
function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

//function to create a single line
function createPath(x0, y0, x1, y1) {
    x1 = x1-x0;
    y1 = y1-y0;
    var string = 'm ' + x0 +" "+ y0 + 'l ' + x1 + " " + y1;
    var path = makeSVG('path', {d: string, stroke: 'blue', 'stroke-width': 1});
    s.appendChild(path)
}

function startDrawing() {
    prevX = curX;
    prevY = curY;
    itvHandle = setInterval(updateDrawing, drawInterval);
}

function stopDrawing() {
    clearInterval(itvHandle);
    itvHandle = null;
}

function mouseUpdate(e) {
    curX = e.clientX;
    curY = e.clientY;
}

function updateDrawing() {
    if (curX == null) { return 0;}
    createPath(prevX, prevY, curX, curY);
    prevX = curX;
    prevY = curY;
}

function mouseClickToggle() {
    if(itvHandle == null) {
        startDrawing();
        return 0;
    }
    stopDrawing();
}