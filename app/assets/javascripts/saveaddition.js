$(document).ready(function() {
  console.log('ready')
  $('#add').on('click', saveAddition)
});

var saveAddition = function(e) {
      console.log(window.clickX)
      console.log(window.clickY)
      console.log(window.clickDrag)
      e.preventDefault()
      data = {
              'clickXArray' : window.clickX,
              'clickYArray' : window.clickY,
              'clickDragArray' : window.clickDrag
                }

      $.ajax({
        url: 'http://localhost:3000/paintings',
        data: data,
        type: 'PUT',
        success: function(response) {
          console.log(response)
        },
        error: function(err) {
          console.log(err)
        }
        })

    }