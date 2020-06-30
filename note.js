//DOM
const addNew = document.querySelector(".add");
const containerAll = document.querySelector(".container");
const container = document.querySelector('.note');
const home = document.querySelector(".home")
const option = document.querySelector(".option");
const addNote = document.querySelector(".addNote");
const noteUL = document.querySelector(".note ul")
const centerBox = document.querySelector("center");
const optionUl = document.querySelector("ul.options");
const header = document.querySelector('header');
//Note List
let noteList = JSON.parse(localStorage.getItem("note")) || [];



//Note Objects
class noteApp{
    //add New Note
    static addTodo(text,category,id){
noteList.push({text,category,id});
localStorage.setItem("note",JSON.stringify(noteList));

document.querySelector(".note ul").insertAdjacentHTML("beforeend",` <div class="notee"><li data-id="${id}">${text}</li> <div class="icon-wrap"><i data-id="${id}" class="fa fa-pencil-square-o" aria-hidden="true"></i>
 <i data-id="${id}" class="fa fa-trash" aria-hidden="true"></i></div></div>`)
    }
//Delete Note
    static deleteNote(id,elem){
let x = noteList.find(i =>{
    return i.id === id
});

let index = noteList.findIndex(i =>{
    return i.id === id
});

noteList.splice(0,1);
elem.remove();
localStorage.setItem("note",JSON.stringify(noteList));


    }

    static editNote(id,ele){
//If Done Edit
header.addEventListener("click",(e)=>{
    
   if(e.target.classList.contains("edit")){

let text = document.querySelector("textarea").value;
let category = document.querySelector("select").value;
if(text){
ele.text = text;
ele.category = category;
localStorage.setItem("note",JSON.stringify(noteList));
window.location.href = "/"
}



   }
})

    }

    static sort(type){
if(type === `byName`){
noteList.sort(compare);
localStorage.setItem("note",JSON.stringify(noteList));
window.location.href = "/"
}
    }
}



//When Add New Todo Is Clicked
addNew.addEventListener("click",()=>{
optionUl.classList.remove("showmenu")
 changeHeader()


})




containerAll.addEventListener("click",(e)=>{

//If Click Is Add    
if(e.target.classList.contains("fa-check")){
   
let text = document.querySelector("textarea").value;
let category = document.querySelector("#category").value;
if(text){
noteApp.addTodo(text,category,makeID(6))
document.querySelector("textarea").value = "";
centerBox.style.display = "none";
document.querySelector(".add .sign").innerHTML = `<i class="fa fa-plus" aria-hidden="true"></i>`

}

}

//If Click Is Back
else if(e.target.classList.contains("home") || e.target.classList.contains("fa-undo") ){
window.location.href = "/index.html";
console.log(`Back Home`)
}

//Toggle Menu
else if(e.target.classList.contains("option") || e.target.classList.contains("fa-ellipsis-v")){
document.querySelector(".options").classList.toggle("showmenu")
}
//Delete Buttons
else if(e.target.classList.contains("fa-trash")){
    let id = e.target.dataset.id;
    let element = e.target.parentElement.parentElement;
    noteApp.deleteNote(id,element)
optionUl.classList.remove("showmenu")
}
//edit
else if(e.target.classList.contains("fa-pencil-square-o")){
let id = e.target.dataset.id;
let element = noteList.find(i => i.id === id);
optionUl.classList.remove("showmenu")
//Set The Current Value
document.querySelector("textarea").value = element.text
document.querySelector("select").value = element.category;
//Manipulate DOM
    container.style.zIndex =  1;
    home.innerHTML = `<i class="fa fa-undo" aria-hidden="true"></i> Back`;
option.innerHTML = `<i class="fa fa-pencil-square-o edit" aria-hidden="true"></i>`;
document.querySelector(".add .sign").innerHTML = ``
centerBox.style.display = "block";


noteApp.editNote(id,element)

}

})


//Done Edit


//Delete All
document.querySelectorAll(".options li")[1].addEventListener("click",(e)=>{
    noteList = [];
localStorage.setItem("note",JSON.stringify(noteList));
    Array.from(document.querySelectorAll(".note ul .notee")).forEach(i =>{
i.remove()
});
optionUl.classList.remove("showmenu")

})

//Sort
document.querySelectorAll(".options li")[0].addEventListener("change",(e)=>{
let option = document.querySelector("#sort").value;
noteApp.sort(option);

})



//Change Header
function changeHeader(){
    container.style.zIndex =  1;
    home.innerHTML = `<i class="fa fa-undo" aria-hidden="true"></i> Back`;
option.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
document.querySelector(".add .sign").innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`
centerBox.style.display = "block";
}


//Create ID For Each Notes
function makeID(leng){
    let result = '';
    let chact = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+?`;
    
    for(i=0;i < leng;i++){
    result += chact.charAt(Math.floor(Math.random() * chact.length))
    }
    return result
    } 


//Sort Compare Function
function compare(first,second){
let comparising = 0;

if(first.text > second.text){
comparising = 1
}else{
comparising = -1
}
return comparising

}





//Init
function init(){
    new noteApp();

}

init();


//Get Storage And Fill Up The Note UI
document.addEventListener("DOMContentLoaded",()=>{
    
    if(noteList.length > 0){
noteList.forEach(i =>{

document.querySelector(".note ul").insertAdjacentHTML("beforeend",` <div class="notee"><li data-id="${i.id}">${i.text}</li> <div class="icon-wrap"><i data-id="${i.id}" class="fa fa-pencil-square-o" aria-hidden="true"></i>
 <i data-id="${i.id}" class="fa fa-trash" aria-hidden="true"></i></div></div>`)


})
    }

})