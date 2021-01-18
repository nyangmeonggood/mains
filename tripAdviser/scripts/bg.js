const bgImage = document.getElementById("bg")
const bgImageNumber = 5

function backGroundImage(){
    var bgNumber = Math.floor(Math.random() * bgImageNumber)

    bgImage.outerHTML = `<img id="bg" src="./images/bg/${bgNumber + 1}.jpg" alt="">`
}

function init(){
    backGroundImage()
}

init()