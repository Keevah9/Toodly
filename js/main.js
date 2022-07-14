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
let itemLeft = document.querySelector('.left')

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
}

let parentItem = document.querySelector('.checkBoxes')

//dynamically add items to the dom
function addTasks(){
    parentItem.innerHTML = ''
    let displayItems =  todoItems.map(a => {
        return ( parentItem.innerHTML += `
        <div class="items">
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


function itemsLeft(){
    console.log(todoItems)
    let total = 0
        // itemLeft.innerHTML = total > 1 ? total + ' Items left'  : total + ' Item left'
        const checkedTask = Array.from(document.querySelectorAll('.items'))
        checkedTask.forEach(item => !item.classList.contains('complete') ? total++ : '')
        itemLeft.innerHTML = total + ' item left'
        // itemLeft.innerHTML = total ++
        if(total > 1){
        itemLeft.innerHTML = total + ' Items left'
    }else if(total === 0){
        itemLeft.innerHTML = 'No item left'
    }
    
}
setInterval(itemsLeft, 500);


//check items
function checked(e){
    let checkBoxes = document.querySelectorAll('.checkBox')
    checkBoxes.forEach(item=>{
        if(e.target !== item)return
        if(e.target.checked){
            let checkedTask = e.target.parentNode
            checkedTask.classList.toggle('complete')
        }else{
            let checkedTask = e.target.parentNode
            checkedTask.classList.remove('complete')
        }
    })
}

//completed items ? checked
function complete(e){
    const checkedTask = Array.from(document.querySelectorAll('.items'))
    checkedTask.forEach(task=>{
        task.classList.contains('complete') ? task.style.display = 'flex' : task.style.display = 'none'})
    }


    
//active items ? unchecked
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
    
    localStorage.setItem("todoItems", JSON.stringify(todoItems)) 
}

//select the checked item
//remove it from local storage
//remove from all
//remove from todo items

//clear completed tasks
const clearCompleted = document.querySelector('.clear')
function clearAll(e){
    let checkedTask = document.querySelectorAll('.complete')
    // console.log(checkedTask)
    checkedTask.forEach(item=>{
        todoItems.splice(item.remove(), 1)
        localStorage.setItem("todoItems", JSON.stringify(todoItems))
    }) 
}



//del items
function delItem(del){
        del.parentElement.remove()
        
        todoItems.splice(del.parentElement.remove(), 1)
        localStorage.setItem("todoItems", JSON.stringify(todoItems))
        console.log(todoItems)
        let total = todoItems.length  
        itemLeft.innerHTML = total > 1 ? total + ' Items left'  : total + ' Item left'
        if(total === 0){
        localStorage.removeItem("todoItems")
        itemLeft.innerHTML = 'No Item left'
    }
    console.log(localStorage)
}

//edit items
function editItems(edit){
        let selectItem = edit.parentElement
        textInput.value = selectItem.children[2].innerHTML
        delItem(edit)
}


// theme

const sun = document.querySelector('.sun')   
const moon = document.querySelector('.moon') 
const header = document.querySelector('header')

const themeSwitcher = document.querySelectorAll('.switch')

function themeToggle(e){
    let checked = e.target
    console.log(checked)
    if(checked == sun){
        sun.style.display = 'none'
        moon.style.display = 'block'
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        header.classList.add('headerThemeLight')
        localStorage.setItem("theme", "light")
    }else{
        sun.style.display = 'block'
        moon.style.display = 'none'
        document.body.classList.add('dark')
        document.body.classList.remove('light')
        localStorage.setItem("theme", "dark")
    }
}


//get local storage
function dataStored(){
    todoItems =  JSON.parse(localStorage.getItem("todoItems")) || []
    addTasks()
    checkTheme()
}
dataStored()

function checkTheme(){
    
    const localStorageTheme = localStorage.getItem("theme")
    console.log(localStorage)
    console.log(localStorageTheme)
    if(localStorageTheme === "dark"){
        document.body.className = localStorageTheme
    }else{
         sun.style.display = 'none'
        moon.style.display = 'block'
        document.body.className = localStorageTheme

    }
}


addText.addEventListener('click', inputValidation)
parentItem.addEventListener('click', checked)
clearCompleted.addEventListener('click', clearAll)
themeSwitcher.forEach(theme=>{
    theme.addEventListener('click', themeToggle)
})

// sun.addEventListener('click', themeToggle)
// moon.addEventListener('click', themeToggle)



