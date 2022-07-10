// select classes
//create empty array
//formValidation
//add info to array
//set local storage
//dynamic html on dom
//delete
//edit
//get localstorage


const textInput = document.querySelector('.input')
const addText = document.getElementById('addText')
const content = document.querySelector('p')
const lists = document.querySelector('.checkBoxes')
const errMsg = document.getElementById('errMsg')

let todoData = []

//input validation
function inputValidation(e){
    // e.preventDefault()
    if(this.checked){
        if(textInput.value === ''){
        errMsg.innerHTML = 'Can not be empty!!!'
        // errMsg.style.border = '2px solid red'
        }
        else{
            // console.log('task')
            errMsg.innerHTML = ''
            // errMsg.style.border = 'none'
            addTodoData()
        }
        
    }
    if(!this.checked){
        const test = textInput.value
        test === ''
    }

    addTasks()

}

//add data  to todo array
function addTodoData(){
    todoData.push({
        desc: textInput.value,    
    })

    localStorage.setItem('todoData', JSON.stringify(todoData))
}



function addTasks(){
    lists.innerHTML = ''
    let displayLists = todoData.map((a)=>{
        return(lists.innerHTML +=`
            <div class="items ">
            <input type="checkbox" class="checkBox">
            
            <label for="checkbox"></label>
            
            <p>${a.desc}</p>
            <img src="./images/1159633.png" alt="" class="edit" onClick="editItem(this)">
            <img src="./images/icon-cross.svg" alt="" onClick= deleteItem(this)>
          </div>
        
        `)
    })

    resetInput()
    displayLists = displayLists.join('')
    // lists.innerHTML = displayLists  
}


function resetInput(){
    textInput.value = '' //reset input value
}

function deleteItem(del){
    // console.log(del)
    del.parentElement.remove() // remove the node item from innerHtml
    todoData.splice(del.parentElement.id, 1) // remove item from our array

    localStorage.setItem('todoDaTa', JSON.stringify(todoData)) // remove from localstorage
}

//edit items
function editItem(edit){
    let selectItem = edit.parentElement
    console.log(selectItem.children)
    textInput.value = selectItem.children[2].innerHTML

    deleteItem(edit)
}

//get items
function dataStored(){
    todoData = JSON.parse(localStorage.getItem('todoData')) || []
    addTasks()
}
dataStored()

addText.addEventListener('click', inputValidation)
