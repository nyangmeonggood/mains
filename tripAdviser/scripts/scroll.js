const greeting = document.getElementById("greeting"),
    searchPanel = document.getElementById("search-panel"),
    down_arrow = document.getElementById("downArrow"),
    list_box = document.getElementById("spot_list")

down_arrow.addEventListener('wheel', function(event){
    if (event.deltaY < 0){
        searchPanel.classList.remove("active")
    }
    else if (event.deltaY > 0){
        greeting.classList.add("active")
        searchPanel.classList.add("active")
        down_arrow.style.display = "none"
    }
})

searchPanel.addEventListener('wheel', function(event){
    if (event.deltaY < 0){
        greeting.classList.remove("active")
        searchPanel.classList.remove("active")
        down_arrow.style.display = "block"
    }
})

list_box.addEventListener('wheel', function(event){
    if (event.deltaY < 0 && list_box.scrollTop === 0){
        list_box.classList.remove("active");
        greeting.classList.remove("fade");
        searchPanel.classList.remove("fade");
    }
})

down_arrow.querySelector("span").addEventListener('click',function(){    
    greeting.classList.add("active")
    searchPanel.classList.add("active")
    down_arrow.style.display = "none"
})
