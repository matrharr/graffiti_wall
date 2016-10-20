$(document).ready(function() {

  function shadowBrush() {
    this.draw = function(i) {
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(window.clickX[i-1], window.clickY[i-1]);
         }else{
           context.moveTo(window.clickX[i]-1, window.clickY[i]);
         }
        
         window.context.shadowBlur = 10;
         window.context.shadowColor = clickColor[i];
         window.context.lineTo(clickX[i], clickY[i]);
         window.context.closePath();
         window.context.lineWidth = clickWidth[i];
         window.context.strokeStyle = clickColor[i];
         window.context.stroke();
         //questionable
         window.context.shadowBlur = 0;
         window.context.shadowColor = 'white';
    };
  };

  function regularBrush() {
    this.draw = function(i) {
        window.context.beginPath();
        if(clickDrag[i] && i){
          window.context.moveTo(window.clickX[i-1], window.clickY[i-1]);
         }else{
           window.context.moveTo(window.clickX[i]-1, window.clickY[i]);
         }
         // window.context.shadowBlur = 0;
         // window.context.shadowColor = 'white';
         window.context.lineTo(window.clickX[i], window.clickY[i]);
         window.context.closePath();
         window.context.lineWidth = clickWidth[i];
         window.context.strokeStyle = clickColor[i];
         window.context.stroke();
    };
  };

  var img = new Image();
  img.src = 'https://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';
  img.width = 10;

  function furBrush() {
    this.draw = function(i) {

        function distanceBetween(point1, point2) {
          return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        }
        function angleBetween(point1, point2) {
          return Math.atan2( point2.x - point1.x, point2.y - point1.y );
        }
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        lastPoint = {x: clickX[i-1], y: clickY[i-1]}

        var currentPoint = { x: clickX[i], y: clickY[i] };
        var dist = distanceBetween(lastPoint, currentPoint);
        var angle = angleBetween(lastPoint, currentPoint);
        
        for (var j = 0; j < dist; j++) {
          x = lastPoint.x + (Math.sin(angle) * j);
          y = lastPoint.y + (Math.cos(angle) * j);
          window.context.save();
          window.context.translate(x, y);
          window.context.scale((clickWidth[i].toFixed(2) * .1), (clickWidth[i].toFixed(2) * .1));
          window.context.rotate(Math.PI * 180 / getRandomInt(0, 180));
          window.context.drawImage(img, 0, 0);
          window.context.restore();
        }
    };
  };

  function penBrush() {
    this.draw = function(i) {
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        lastPoint = {x: clickX[i-1], y: clickY[i-1]}

        window.context.beginPath();
        window.context.lineWidth = clickWidth[i];
        window.context.strokeStyle = clickColor[i];
  
        window.context.moveTo(lastPoint.x - getRandomInt(0, 2), lastPoint.y - getRandomInt(0, 2));
        window.context.lineTo(clickX[i] - getRandomInt(0, 2), clickY[i] - getRandomInt(0, 2));
        window.context.stroke();

        window.context.moveTo(lastPoint.x, lastPoint.y);
        window.context.lineTo(clickX[i], clickY[i]);
        window.context.stroke();
        
        window.context.moveTo(lastPoint.x + getRandomInt(0, 2), lastPoint.y + getRandomInt(0, 2));
        window.context.lineTo(clickX[i] + getRandomInt(0, 2), clickY[i] + getRandomInt(0, 2));
        window.context.stroke();
    };
  };

  function slicedBrush() {
    this.draw = function(i) {
      window.context.beginPath();

      lastPoint = {x: clickX[i-1], y: clickY[i-1]}
  
      window.context.lineWidth = clickWidth[i];
      window.context.strokeStyle = clickColor[i];

      window.context.globalAlpha = 1;
      window.context.moveTo(lastPoint.x, lastPoint.y);
      window.context.lineTo(clickX[i], clickY[i]);
      window.context.stroke();
      
      window.context.moveTo(lastPoint.x - 4, lastPoint.y - 4);
      window.context.lineTo(clickX[i] - 4, clickY[i] - 4);
      window.context.stroke();
      
      window.context.moveTo(lastPoint.x - 2, lastPoint.y - 2);
      window.context.lineTo(clickX[i] - 2, clickY[i] - 2);
      window.context.stroke();
      
      window.context.moveTo(lastPoint.x + 2, lastPoint.y + 2);
      window.context.lineTo(clickX[i] + 2, clickY[i] + 2);
      window.context.stroke();
      
      window.context.moveTo(lastPoint.x + 4, lastPoint.y + 4);
      window.context.lineTo(clickX[i] + 4, clickY[i] + 4);
      window.context.stroke();
    };
  };


  function sprayBrush() {
    this.draw = function(i) {
      var density = 25;

      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + clickWidth[i] * 2;
      };

      window.context.moveTo(clickX[i], clickY[i]);
      // window.context.lineWidth = clickWidth[i];
      // window.context.strokeStyle = clickColor[i];

      for (var j = density; j--; ) {
        var radius = getRandomFloat(0, Math.PI*2);
        var angle = getRandomFloat(0, 20);
         window.context.fillRect(clickX[i] + radius * Math.cos(angle), clickY[i] + radius * Math.sin(angle), 1, 1);
      }

    };
  };

  shadow = new shadowBrush();
  standard = new regularBrush();
  fur = new furBrush();
  pen = new penBrush();
  sliced = new slicedBrush();
  spray = new sprayBrush();

  curBrush = standard;

  $('.brush').on('click', function(e){
    e.preventDefault
    var brush_id = $(this).attr('id')
    switch (brush_id) {
      case 'spray':
        curBrush = spray;
        break;
      case 'standard':
        curBrush = standard;
        break;
      case 'shadow':
        curBrush = shadow;
        break;
      case 'fur':
        curBrush = fur;
        break;
      case 'sliced':
        curBrush = sliced;
        break;
      case 'pen':
        curBrush = pen;
        break;
    }
    
  });
});




