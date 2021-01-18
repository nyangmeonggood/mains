const body = document.querySelector("body")

const IMG_NUMBER = 12;

function loadImage(imgNumber){
    
    const bgImage = new Image();
    bgImage.src = `img/${imgNumber + 1}.jpg`;
    bgImage.classList.add("bg")
    body.prepend(bgImage)
    
    /*
    if(imgNumber === 6){
        body.style.backgroundColor = "white";
        bgImage.style.opacity = "1";
        document.querySelector("#main>.pos_center").classList.add("wbg_txt")
        document.querySelector(".js_toDo .js_form input").classList.add("wbg_box")
        document.querySelector(".js_weather").classList.add("wbg_txt")
    }
    */
}

function makeRandom(){
    const Number = Math.floor(Math.random() * IMG_NUMBER);
    return Number
}

function init(){
    const randomNumber =  makeRandom();
    loadImage(randomNumber)
}

init()

//Math.floor()은 버림, Math.ceiling()은 올림