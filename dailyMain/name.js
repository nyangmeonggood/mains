const nameForm = document.querySelector(".js_name .js_form"),
    nameInput = nameForm.querySelector("input"),
    welcome = document.querySelector(".js_welcome"),
    changeNamebox = document.querySelector(".js_changeName"),
    blankBar = document.querySelector(".bar"),
    timeLine = document.querySelector(".timeline"),
    todo = document.querySelector("div.js_toDo")    

const USERNAME = "userName",
    SHOW_ON = "show"

function loadName(){
    const userName = localStorage.getItem(USERNAME)

    if(userName === null){
        whatIsYourName()
    }else{
        showWelcome(userName);
    }
}

function whatIsYourName(){
    nameForm.classList.add(SHOW_ON);
    blankBar.classList.add(SHOW_ON);
    nameForm.addEventListener("submit", submitName)
}

function submitName(event){
    event.preventDefault();
    const currentUser = nameInput.value;
    
    rememberName(currentUser);
    showWelcome(currentUser);
}

function rememberName(text){
    localStorage.setItem(USERNAME, text);
}

function showWelcome(text){
    blankBar.classList.remove(SHOW_ON);
    nameForm.classList.remove(SHOW_ON);
    timeLine.classList.add(SHOW_ON);
    welcome.classList.add(SHOW_ON);
    todo.classList.add(SHOW_ON);

    var HelloMentList = ["안녕하세요.", "좋은 하루네요.", "벌써 집에 가고싶으신가봐요?"]
    var HelloMentNumber = Math.floor(Math.random() * HelloMentList.length);

    welcome.querySelector(".js_hi").innerHTML = `${HelloMentList[HelloMentNumber]} ${text}님!`;
    welcome.querySelector(".js_changeName").addEventListener("click",changeName)
}

function changeName(){
    welcome.classList.remove(SHOW_ON);
    timeLine.classList.remove(SHOW_ON);
    todo.classList.remove(SHOW_ON);
    localStorage.removeItem(USERNAME);
    whatIsYourName();

    const autoFocusName = setTimeout(function(){
        nameInput.focus();
        console.log("hi")
    },500)
}

function init(){
    loadName()
}

init()