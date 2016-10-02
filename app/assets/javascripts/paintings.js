(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  clickX;
  clickY;
  clickDrag;
  clickColor;
  paint;


  function init(){

    colorPurple = "#cb3594";
    colorGreen = "#659b41";
    colorYellow = "#ffcf33";
    colorBrown = "#986928";

    curColor = colorBrown;

    $('#green').on('click', function(e){
      e.preventDefault();
      curColor = colorGreen;
    });

    $('#purple').on('click', function(e){
      e.preventDefault();
      curColor = colorPurple;
    });

    $('#yellow').on('click', function(e){
      e.preventDefault();
      curColor = colorYellow;
    });

    $('#brown').on('click', function(e){
      e.preventDefault();
      curColor = colorBrown;
    });


    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', 490);
    canvas.setAttribute('height', 220);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");
    
    $.ajax({
      url: 'http://localhost:3000/paintings/today',
      type: 'GET',
      success: function(response) {
        clickX = response['clickXArray'];
        clickY = response['clickYArray'];
        clickDrag = response['clickDragArray'];
        clickColor = response['clickColorArray'];
        console.log(response)
        
        redraw()
      },
      error: function(err) {
        console.log(err)
      }
    });

    

    // mouse down
    $('#canvas').mousedown(function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
        
      paint = true;
      addClick(mouseX, mouseY);
      redraw();
    });


    // mouse move 
    $('#canvas').mousemove(function(e){
      if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
      }
    });

    // mouse up
    $('#canvas').mouseup(function(e){
      paint = false;
    })

    // mouse leave
    $('#canvas').mouseleave(function(e){
      paint = false;
    });


    function addClick(x, y, dragging)
    {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(curColor);
      console.log(clickColor)
      
    }


    function redraw(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
      
      context.lineJoin = "round";
      context.lineWidth = 5;
      
      for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.strokeStyle = clickColor[i];
         context.stroke();
      }
    }

  }

})(window, document, undefined);
