$(function(){
    var map;
    var id = parseWord(window.location.search);

    getDetail(id);
})

function parseWord(str){
    var s = str.substring(1);
    var args = s.split('&');

    for(var i = 0; i < args.length; i++){
        var arg = args[i];
        var tokens = arg.split('=');

        if(tokens[0] === 'id'){
            return tokens[1]
        }
    }

    return null
}

function getDetail(id){
    var url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url,{
        id: id
    },function(r){
        $(".detailHeaderName").html(r.name);
        $(".detailHeaderCityName").html(r.cityName);
        $(".detailDescText").html(r.desc);

        var $gallery = $("#detailImage");
        var image = r.subImageList;

        var i = Math.floor(Math.random() * image.length);
        var $image = `<img src="${image[i]}" alt="">`;
        $gallery.append($image)

        showMap(r.position.x,r.position.y)

            $('.resisterBtn').click(function(){
                var myTrips = Cookies.getJSON('MYTRIPS');
        
                if(!myTrips || myTrips === "{}"){
                    myTrips = [];
                };
                 
                myTrips.push({
                    id: id,
                    name: r.name,
                    cityName: r.cityName,
                    x: r.position.x,
                    y: r.position.y
                });
                
                Cookies.set("MYTRIPS",myTrips);

                alert("등록!")
            })
    })
}

function showMap(x,y){
    var detailMap = document.getElementById('detailMap');
    
    var options = {
        center: new kakao.maps.LatLng(x, y),
        level: 5
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