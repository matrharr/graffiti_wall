$(document).ready(function() {
  console.log('ready')
  $('#add').on('click', saveAddition)
});

var saveAddition = function(e) {
      console.log(clickColor)
      e.preventDefault()
      data = {
              'clickXArray' : window.clickX,
              'clickYArray' : window.clickY,
              'clickDragArray' : window.clickDrag,
              'clickColorArray' : window.clickColor
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

// (function(window, document, undefined){

// // code that should be taken care of right away

// window.onload = init;

  

//   function init(){
//     $('#add').on('click', saveAddition)

//     var saveAddition = function(e) {
//       console.log(clickColor)
//       e.preventDefault()
//       data = {
//               'clickXArray' : window.clickX,
//               'clickYArray' : window.clickY,
//               'clickDragArray' : window.clickDrag,
//               'clickColorArray' : window.clickColor
//                 }

//       $.ajax({
//         url: 'http://localhost:3000/paintings',
//         data: data,
//         type: 'PUT',
//         success: function(response) {
//           console.log(response)
//         },
//         error: function(err) {
//           console.log(err)
//         }
//         })

//     }
//   }

// })(window, document, undefined);
