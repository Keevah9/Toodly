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

    window.location.reload();
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
    itemLeft.style.display = 'none'
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
     let total = todoItems.length
     itemLeft.innerHTML = total > 1 ? total + ' Items left'  : total + ' Item left'
        if(total === 0){
        itemLeft.innerHTML = 'No Item left'
    }
}

//clear completed tasks
const clearCompleted = document.querySelector('.clear')
function clearAll(){
    let checkedTask = Array.from(document.querySelectorAll('.items'))
    checkedTask.forEach(item=>{
        item.remove()
    })
}

window.onload = function(left){
    let itemLeft = document.querySelector('#itemLeft')
    console.log(todoItems)
    let total = todoItems.length 
        itemLeft.innerHTML = total > 1 ? total + ' Items left'  : total + ' Item left'
        if(total === 0){
        itemLeft.innerHTML = 'No Item left'
    }
}

//del items
function delItem(del){
        del.parentElement.remove()
        localStorage.setItem("todoItems", JSON.stringify(todoItems))
        todoItems.splice(del.parentElement.remove(), 1)
        console.log(todoItems)
        let total = todoItems.length  
        itemLeft.innerHTML = total > 1 ? total + ' Items left'  : total + ' Item left'
        if(total === 0){
        localStorage.clear()
        itemLeft.innerHTML = 'No Item left'
    }
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



// theme

const sun = document.querySelector('.sun')   
const moon = document.querySelector('.moon') 
// const header = document.querySelector('header')
// const main = document.querySelector('.container')
// const mainInput = document.querySelector('.mainInput')
// const input = document.querySelector('.input')
const fillItems = document.querySelector('.filItems')

function themeToggle(e){
    let imgSelected = e.target
    if(imgSelected == sun){
        moon.classList.remove('moon')
        sun.style.display = 'none'
        document.body.style.setProperty("--pri-bg", "rgb(223, 220, 220)")
        document.querySelector('header').style.background = 'url(/images/bg-desktop-light.jpg)', 'no-repeat', 'cover'
        document.querySelector('.container').style.background = 'hsl(0, 0%, 98%)'
        document.querySelector('.container').style.boxShadow = '0 5px 5px rgb(156, 153, 153)'
        document.querySelector('.mainInput').style.background = 'hsl(0, 0%, 98%)'
        document.querySelector('.input').style.background = 'hsl(0, 0%, 98%)'
        document.querySelector('.input').style.color = 'hsl(236, 15%, 21%)'
        document.querySelector('.filItems').style.background = 'hsl(0, 0%, 98%)'
        document.body.style.color =  'hsl(236, 15%, 21%)'

    }if(imgSelected == moon){
        sun.style.display = 'block'
        moon.classList.add('moon')
        document.body.style.setProperty( "--pri-bg", "hsl(235, 21%, 11%)")
        document.querySelector('header').style.background = 'url(/images/bg-desktop-dark.jpg)', 'no-repeat'
        document.querySelector('.container').style.background = 'hsl(236, 15%, 21%)'
        document.querySelector('.container').style.boxShadow = 'none'
        document.querySelector('.mainInput').style.background = 'hsl(236, 15%, 21%)'
        document.querySelector('.input').style.background = 'hsl(236, 15%, 21%)'
        document.querySelector('.input').style.color  = 'hsl(234, 39%, 85%)';
        document.querySelector('.filItems').style.background = 'hsl(236, 15%, 21%)'
        document.body.style.color =  'hsl(235, 10%, 45%)'
    }
    
}



addText.addEventListener('click', inputValidation)
parentItem.addEventListener('click', checked)
clearCompleted.addEventListener('click', clearAll)
sun.addEventListener('click', themeToggle)
moon.addEventListener('click', themeToggle)
