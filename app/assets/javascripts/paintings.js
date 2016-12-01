(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;
  // clickX;
  // clickY;
  // clickDrag;
  // clickColor;
  paint = false;

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
        window.clickBrush = []
        console.log('init')
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
      // redraw();
    });


    // mouse move 
    $('#canvas').mousemove(function(e){
      if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        clickBrush[clickBrush.length-1].draw(clickBrush.length-1)
        // redraw();
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
      clickWidth.push(window.lineWidth);
      console.log(clickWidth)
      clickBrush.push(window.curBrush);
      // clickBrush[clickBrush.length-1].draw(clickBrush.length-1)
      // console.log(clickBrush)
    }



    function redraw(){
      console.log(window.context)
      window.context.clearRect(0, 0, window.context.canvas.width, window.context.canvas.height); // Clears the canvas
      
      window.context.lineJoin = window.context.lineCap = "round";

      for(var i=0; i < clickX.length; i++) {
        clickBrush[i].draw(i)
      //   context.beginPath();
      //   if(clickDrag[i] && i){
      //     context.moveTo(clickX[i-1], clickY[i-1]);
      //    }else{
      //      context.moveTo(clickX[i]-1, clickY[i]);
      //    }
      //    context.lineTo(clickX[i], clickY[i]);
      //    context.closePath();
      //    context.lineWidth = clickWidth[i];
      //    context.strokeStyle = clickColor[i];
      //    context.stroke();
      }
    }

  }

})(window, document, undefined);
