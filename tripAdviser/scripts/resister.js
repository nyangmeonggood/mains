$(function(){
    createSelectYear($('#selectBirth'))

    $("#form_register").submit(function(e){
        e.preventDefault();

        $(this).find('.txt_warning').empty().hide();
        $(this).removeClass("warning");

        var email = $('#inpEmail').val();

        if(!validEmail(email)){
            $("#inpEmail").next().text('잘못된 형식의 이메일입니다.').show();
        }

        var password = $('#inpPW').val();

        if(!validPassword(password)){
            $("#inpPW").next().text('대문자와 숫자를 포함한 8자 이상의 문자열이여야 합니다.').show()          
        }

        var confirm = $('#inpPWConfirm').val();

        if(confirm !== password){
            $("#inpPWConfirm").next().text('비밀번호와 일치하지 않습니다.').show()        
        }

        var birth = $("#selectBirth").val();

        if(!birth){
            $("#selectBirth").siblings(".txt_warning").html("필수 항목입니다.").show();           
        }

        var style = $('input[name="gender"]:checked').val();

        if(!style){
            $("#inpOut").closest("li").siblings(".txt_warning").html("필수 항목입니다.").show();           
        }

        var accept = $("#inpAccept:checked").val();

        if(!accept){
            $("#inpAccept").siblings(".txt_warning").html("필수 항목입니다.").show();           
        }

        alert("레이아웃 및 요소 검사만 작동되는 페이지입니다!")
        submitData(email, password, style, birth)
    })
})

function validEmail(email){
    var re = /^(([^<>()[\]\\.,;;\s@\"]+(\.[^<>()[\]\\.,;;\s@\"]+)*)|(\",+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validPassword(password){
    var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\s).*$/;
    return re.test(password);
}

function createSelectYear($select){
    var current = new Date();
    var currentYear = current.getFullYear();

    for (var i = currentYear-100; i <= currentYear; i ++){
        $select.append(`<option value="${i}">${i}</option>`)
    }
}

function submitData(email, password, gender, birth){
    var clientDate = {
        email : email,
        password : password,
        gender : gender,
        birth : birth
    }

    $.post('bdd61bcbf83690e4ecab5eaf7d1ab8d5',clientDate,function(r){
        console.log(r)
    })
}