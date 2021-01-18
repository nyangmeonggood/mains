const clockContainer = document.querySelector(".js_clock");
const clockTitle = clockContainer.querySelector("h1");
const workTimeLine = document.querySelector(".timeline_ing"),
    remaintTime = document.querySelector(".remain_time")

function setTime(){
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    clockTitle.innerHTML = `${
        hour < 10 ? `0${hour}` : hour
    }<span>:</span>${
        minute < 10 ? `0${minute}` : minute
    }`

    const workEndTime = 18*60;
    const workStartTime = 9*60;

    const remainHour = `${workEndTime/60 -1 - hour}시간`
    const remainMinute = `${60 - minute}분`;

    ingWidth = (hour * 60 + minute - workStartTime) / (workEndTime - workStartTime) * 100
    if(ingWidth>100){ingWidth = 100}

    workTimeLine.style.width = ingWidth + "%";
    remaintTime.style.left =  ingWidth + "%";
    if(hour >= 9 && hour < 18){
        remaintTime.innerHTML = `남은 시간은 <span>${remainHour} ${remainMinute}</span> 입니다`
    }else{
        remaintTime.innerHTML = `근무시간이 아닙니다!`
    }
}

function init(){
    setTime()
    setInterval(setTime,1000)
}

init();

