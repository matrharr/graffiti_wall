(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){
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
    
    var clickX;
    var clickY;
    var clickDrag = new Array();
    var paint;

    $.ajax({
      url: 'http://localhost:3000/paintings/today',
      type: 'GET',
      success: function(response) {
        clickX = response['clickXArray']
        clickY = response['clickYArray']
        console.log(clickX.length)
        redraw()
      },
      error: function(err) {
        console.log(err)
      }
    });

    

    // mouse down
    $('#canvas').mousedown(function(e){
      console.log(this)
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
    }


    function redraw(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
      
      context.strokeStyle = "#df4b26";
      context.lineJoin = "miter";
      context.lineWidth = 5;
      
      console.log(clickX)
      for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.stroke();
      }
    }

  }

})(window, document, undefined);
