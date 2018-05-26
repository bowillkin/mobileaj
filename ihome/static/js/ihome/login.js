function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function my_login(){
    $("#mobile").focus(function(){
        $("#mobile-err").hide();
    });
    $("#password").focus(function(){
        $("#password-err").hide();
    });
    mobile = $("#mobile").val();
    passwd = $("#password").val();
    // if (!mobile) {
    //     $("#mobile-err span").html("请填写正确的手机号！");
    //     $("#mobile-err").show();
    //     return;
    // }
    // if (!passwd) {
    //     $("#password-err span").html("请填写密码!");
    //     $("#password-err").show();
    //     return;
    $.ajax({
        url:'/ihome/login/',
        type:'POST',
        dataType:'json',
        data:{'mobile': mobile, 'password': passwd},
        success:function(data){
            if(data.code=='200'){
                alert('登录成功');
                location.href = '/ihome/my/'
            }else{
                alert(data.msg)
            }
        },
        error:function(data){
            alert(data.msg)
        }
    })

}