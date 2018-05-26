function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

var imageCodeId = "";

function generateUUID() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// 下面在监听
function my_submit(){
    mobile = $("#mobile").val();
    passwd = $("#password").val();
    passwd2 = $("#password2").val();
    $.ajax({
        url:'/ihome/register/',
        type:'POST',
        dataType:'json',
        data:{'mobile': mobile, 'password': passwd, 'password2': passwd2},
        success:function(data){
            if(data.code=='200'){
                alert('注册成功');
                location.href = '/ihome/login/'
            }else{
                alert(data.msg)
            }
        },
        error:function(data){
            alert(data.msg)
        }
    })


}