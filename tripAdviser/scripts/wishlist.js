var map;
var markers={};

$(function(){
    var myTrips = Cookies.getJSON('MYTRIPS');

    if (!myTrips)
        myTrips = [];

    showMap(33.3617,126.5292,10)
    generateMyTrip(myTrips)
})

function generateMyTrip(myTripsList){
    var $list = $("#list");

    for (var i = 0; i < myTripsList.length; i++){
        var myTrip = myTripsList[i];

        var $item = $("#list_template").clone().removeAttr('id');

        $item.find(".listName").html(myTrip.name);
        $item.find(".listName").attr("x",myTrip.x)
        $item.find(".listName").attr("y",myTrip.y)
        $item.find(".listCityName").html(myTrip.cityName);
        $list.append($item);
    }

    $(".listName").click(function(){
        var x = $(this).attr("x");
        var y = $(this).attr("y");

        showMap(x,y,5)
    })

    $(".listRemove").click(function(){
        var $parent = $(this).closest(".list_content")
        $parent.remove();
        console.log(Cookies.getJSON('MYTRIPS'))

        var newList = removeFromList(Cookies.getJSON('MYTRIPS'), myTrip.id)
        Cookies.set("MYTRIPS",newList)
    })
}

function showMap(x,y,z){
    var detailMap = document.getElementById('map');
    
    var options = {
        center: new kakao.maps.LatLng(x, y),
        level: z
    };

    map = new kakao.maps.Map(detailMap, options);

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(x, y); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}

function removeFromList(list, id){
    var index = -1;

    for (var i = 0; i <list.length; i++){
        if(list[i].id === id){
            index= i;
            break;
        }
    }

    if (index !== -1){
        list.splice(index - 1,1);
    }
    
    return list;
}