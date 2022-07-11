//add new todos
    //take in an input value
    //validate the input
    //if success, add to array and display onto dom || alert err
//mark todo as complete
//delete item
//edit item
//filter items by all, active, completed
//delete all completed items    
//toggle themes

let todoItems = []

const addText = document.querySelector('#addText')
const textInput = document.querySelector('.input')
const errMsg = document.querySelector('#errMsg')

//validate input
function inputValidation(e){
    e.preventDefault()
    if(this.checked){
        if(textInput.value === ''){
            errMsg.innerHTML = 'Can not be empty'
        }else{
        errMsg.innerHTML = ''
        pushData()
        textInput.value = ''
        }
        
    }
    textInput.focus()
    addTasks()
}

//push data into array and store in local storage
function pushData(){
    todoItems.push({
        desc: textInput.value,
    })
    localStorage.setItem("todoItems", JSON.stringify(todoItems))
    console.log(todoItems)
}

let parentItem = document.querySelector('.checkBoxes')

//dynamically add items to the dom
function addTasks(){
    parentItem.innerHTML = ''
    let displayItems =  todoItems.map(a => {
        return ( parentItem.innerHTML += `
        <div class="items ">
        <input type="checkbox" class="checkBox">
      
         <label for="checkbox"></label>
      
        <p>${a.desc}</p>
        <img src="./images/1159633.png" alt="" class="edit" onclick="editItems(this)">
        <img src="./images/icon-cross.svg" alt="" class="delete" onclick="delItem(this)" >
      </div>
    `)
    })
    displayItems = displayItems.join('')
    
}


//check items
function checked(e){
    let checkBoxes = document.querySelectorAll('.checkBox')
    checkBoxes.forEach(item=>{
        if(e.target !== item)return
        if(e.target.checked){
            let checkedTask = e.target.parentNode
            checkedTask.classList.toggle('complete')
            console.log(checkedTask)
        }else{
            let checkedTask = e.target.parentNode
            checkedTask.classList.remove('complete')
        }
    })
}

//completed items ? checked
function complete(e){
    console.log(e)
    const checkedTask = Array.from(document.querySelectorAll('.items'))
    checkedTask.forEach(task=>{
        task.classList.contains('complete') ? task.style.display = 'flex' : task.style.display = 'none'
    })

    localStorage.setItem("todoItems", JSON.stringify(todoItems))
}

//active items ? unckecked
const active = document.querySelector('.active')
function activeItems(e){
    const checkedTask = Array.from(document.querySelectorAll('.items'))
    checkedTask.forEach(item=>{
        item.classList.contains('complete') ? item.style.display = 'none' : item.style.display = 'flex'
    })
}

//all items
function allItems(e){
    console.log(e)
     const checkedTask = Array.from(document.querySelectorAll('.items'))
     checkedTask.forEach(item=>{
         console.log(item)
         item.style.display = 'flex' 
     })
}

//clear completed tasks
const clearCompleted = document.querySelector('.clear')
function clearAll(){
    let checkedTask = Array.from(document.querySelectorAll('.items'))
    checkedTask.forEach(item=>{
        item.remove()
    })
}

//del items
function delItem(del){
        del.parentElement.remove()
        localStorage.setItem("todoItems", JSON.stringify(todoItems))
        todoItems.splice(del.parentElement.remove(),1)
        console.log(todoItems)
}

//edit items
function editItems(edit){
        let selectItem = edit.parentElement
        textInput.value = selectItem.children[2].innerHTML
        delItem(edit)
}

//get local storage
function dataStored(){
    todoItems =  JSON.parse(localStorage.getItem("todoItems")) || []
    addTasks()
}
dataStored()


addText.addEventListener('click', inputValidation)
parentItem.addEventListener('click', checked)
clearCompleted.addEventListener('click', clearAll)

















