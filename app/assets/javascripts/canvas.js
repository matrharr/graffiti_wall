(function(window, document, undefined){

  window.onload = createCanvas;

  window.context;

  function createCanvas() {
    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', window.innerWidth - 100);
    canvas.setAttribute('height', window.innerHeight - 100);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas)
    console.log('the fucking function')
    if(typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    window.context = canvas.getContext("2d");
  }

})
