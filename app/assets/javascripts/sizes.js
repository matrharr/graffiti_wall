$(document).ready(function() {

    window.lineWidth = 5

    $('#big-line').on('click', function(e){
      e.preventDefault()
      window.lineWidth = 10
    })

    $('#med-line').on('click', function(e){
      e.preventDefault()
      window.lineWidth = 5
    })

    $('#small-line').on('click', function(e){
      e.preventDefault()
      window.lineWidth = 3
    })


});