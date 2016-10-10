(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;
  // clickX;
  // clickY;
  // clickDrag;
  // clickColor;
paint = false;

clickBrush = [];

  function init(){

    $.ajax({
      url: 'http://localhost:3000/paintings/today',
      type: 'GET',
      success: function(response) {
        window.clickX = response['clickXArray'] || [];
        window.clickY = response['clickYArray'] || [];
        window.clickDrag = response['clickDragArray']||[];
        window.clickColor = response['clickColorArray'] || [];
        window.clickWidth = response['clickWidthArray'] || [];
        
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
      clickWidth.push(window.lineWidth)
    }



    function redraw(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
      
      // context.lineJoin = "round";
      // context.lineWidth = window.lineWidth
      // context.shadowBlur = 0;
      // context.shadowColor = 'rgb(0, 0, 0)';


      for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.lineWidth = clickWidth[i];
         context.strokeStyle = clickColor[i];
         context.stroke();
      }
    }

  }

})(window, document, undefined);
