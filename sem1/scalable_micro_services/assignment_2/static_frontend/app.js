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
    text = document.createTextNode(array[i].name)

    completeBtn = document.createElement('BUTTON')
    completeBtn.classList = 'button button-clear'
    completeBtn.innerText = 'Mark Complete'

    if (array[i].complete) {
      item.classList = 'strike'
      completeBtn.disabled = true
    }
    
    completeBtn.addEventListener("click", function (b){
      completeToDo(b)
    })

    item.appendChild(text)
    item.appendChild(completeBtn)
    listElement.appendChild(item)
  }
}

function completeToDo(todo) {
  var item = todo.srcElement.parentNode

  item.classList = 'strike'
  todo.srcElement.disabled = true
}

function addToDo(listElement, toDoItem) {
  var item;
  var text;
  var completeBtn;

  item = document.createElement('LI')
  text = document.createTextNode(toDoItem)

  completeBtn = document.createElement('BUTTON')
  completeBtn.classList = 'button button-clear'
  completeBtn.innerText = 'Mark Complete'

  completeBtn.addEventListener("click", function (b){
    completeToDo(b)
  })

  item.appendChild(text)
  item.appendChild(completeBtn)
  listElement.appendChild(item)
}


$( document ).ready(function() {
  var todos = []
  var listElement = document.getElementById('list')
  
  getToDos(function (data) {
    todos = data.items
    updateList(listElement, todos)
  })


  // event listeners
  // add item
  document.getElementById("addBtn").addEventListener("click", function (){
    var todo = document.getElementById('itemInput').value
    console.log("Todo", todo)
    var listElement = document.getElementById('list')
    addToDo(listElement, todo)
  })
})