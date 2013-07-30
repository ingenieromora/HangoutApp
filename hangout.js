// Globant - Proof of Concept: Hangout Drawing App
// 2013-07-29

// DISCLAIMER. This code is based on these examples:
// * "Canvas - Dive into HTML5"
//    http://diveintohtml5.info/canvas.html
// * "Create a Drawing App with HTML5 Canvas and JavaScript"
//    http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/ 
// 

var canvas;
var context;
var canvasWidth = 800;
var canvasHeight = 400;
var imageUrl = 'http://rawgithub.com/gonzazarza/HangoutApp/master/images/google.png';
var paint = false;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

/**
 * Creates the canvas, loads the background image, and enables the canvas drawing tool.
 */
function hangoutDrawing(){
	// create the canvas
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	context = canvas.getContext("2d");
	// clears the canvas and load the background image
	loadBackgroundImage();
	// enable the foreground drawing by means of mouse events
	registerMouseEvents();
}


/**
 * Clears the canvas and loads the background inmage to the given context.
 */
function loadBackgroundImage(){
	// clear the canvas
	canvas.width = canvas.width;
	// load the image
	var image = new Image();
	image.src = imageUrl;
	image.onload = function(){ context.drawImage(image, 0, 0); };
}


/**
 * Registers the mouse events needed to draw on canvas.
 */
function registerMouseEvents(){
	// mouse down
	$('#canvas').mousedown(function(e){
	  var mouseX = e.pageX - this.offsetLeft;
	  var mouseY = e.pageY - this.offsetTop;
	  // add click
	  paint = true;
	  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	  drawOnCanvas();
	});
	// mouse move
	$('#canvas').mousemove(function(e){
	  if(paint){
	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	    drawOnCanvas();
	  }
	});
	// mouse up
	$('#canvas').mouseup(function(e){
	  paint = false;
	});
	// mouse leave
	$('#canvas').mouseleave(function(e){
	  paint = false;
	});
}


/**
 * Adds a point to the drawing array.
 * @param x
 * @param y
 * @param dragging
 */
function addClick(x, y, dragging){
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}


/**
 * Enables the canvas drawing tool.
 */
function drawOnCanvas(){
	// set the drawing tools
	context.strokeStyle = "blue";
	context.lineJoin = "round";
	context.lineWidth = 5;
	// draw
	for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
    	if(clickDrag[i] && i){
      		context.moveTo(clickX[i-1], clickY[i-1]);
     	} else {
       		context.moveTo(clickX[i]-1, clickY[i]);
     	}
     	context.lineTo(clickX[i], clickY[i]);
     	context.closePath();
     	context.stroke();
  	}

}
