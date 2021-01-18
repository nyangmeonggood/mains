const toDoForm = document.querySelector(".js_toDo .js_form"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js_toDoList");

const TODOS_LIST = 'toDos';

let toDos = [];

function saveTodos(){
    localStorage.setItem(TODOS_LIST, JSON.stringify(toDos));
}//localStorage에는 "String"만 저장가능하다. 자바스크립트의 data를 저장할 수가 없다! 그 때 쓰는게 JSON.stringfy

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LIST)

    if(loadedToDos !== null){
        //JSON은 JavaScript Object Notation의 준말. 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있도록 object형태로 바꿔주는 기능.
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(savedToDos){
            paintToDo(savedToDos.text)
        })
        //forEach() -> array에 담겨있는것들을 각각 한 번에 하나씩 함수를 실행시켜주는것
    }
}

function delToDos(event){
    const btn = event.target;
    const del_li_arrow = btn.parentNode
    const del_li = del_li_arrow.parentNode;
    toDoList.removeChild(del_li)

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== del_li.id
    })
    //.filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들로 새로운 array를 만든다.
    
    toDos = cleanToDos
    saveTodos()
}

function paintToDo(text){
    const add_li = document.createElement("li");
    const del_li = document.createElement("button");
    del_li.innerHTML = `<span class="line line_0"></span><span class="line line_1"></span><span class="line line_2"></span>`
    const del_li_arrow = del_li.querySelector("span")
    del_li_arrow.addEventListener("click",delToDos)
    const con_li = document.createElement("span");
    const newId =  toDos.length + 1;
    con_li.innerText = text;

    add_li.appendChild(del_li);
    add_li.appendChild(con_li);
    add_li.id = `todoList${newId}`;
    toDoList.appendChild(add_li);    

    const toDoObj = {
        text: text,
        id : `todoList${newId}`
    }

    toDos.push(toDoObj);
    saveTodos();
}

function addToDos(event){
    event.preventDefault();

    const newList = toDoInput.value;
    paintToDo(newList)
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",addToDos)
}

init();