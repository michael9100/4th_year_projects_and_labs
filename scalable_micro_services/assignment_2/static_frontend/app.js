// API Calls
function getToDos(callback) {
  $.ajax({
    url: "http://localhost:3001/api/items",
    method: "post",
  }).done(function(data) {
    callback(data)
  })
}

function updateList(listElement, array) {
  // Takes in either a ul or ol refference and fills with array
  var item;
  var text;
  var completeBtn;
  for (i = 0; i < array.length; i++) {
    item = document.createElement('LI')
    text = document.createTextNode(array[i])
    completeBtn = document.createElement('BUTTON')
      .classList = 'button button-clear'
    item.appendChild(text)
    item.appendChild(completeBtn)
    listElement.appendChild(item)
  }
}


$( document ).ready(function() {
  var todos = []
  var listElement = document.getElementById('list')
  
  getToDos(function (data) {
    todos = data.items
    updateList(listElement, todos)
  })

})