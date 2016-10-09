$(document).ready(function() {

  colorPurple = "#cb3594";
  colorGreen = "#659b41";
  colorYellow = "#ffcf33";
  colorBrown = "#986928";

  curColor = window.colorPurple;

    $('#green').on('click', function(e){
      e.preventDefault();
      curColor = window.colorGreen;
    });

    $('#purple').on('click', function(e){
      e.preventDefault();
      curColor = window.colorPurple;
    });

    $('#yellow').on('click', function(e){
      e.preventDefault();
      curColor = window.colorYellow;
    });

    $('#brown').on('click', function(e){
      e.preventDefault();
      curColor = window.colorBrown;
    });
});










