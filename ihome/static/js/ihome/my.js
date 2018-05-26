// $.get('/ihome/my1/', function (data) {
//     if(data.code == '200'){
//         alter(data.msg)
//     }
// });


function logout() {
    $.get("/ihome/logout/", function(data){
        if (data.code == '200') {
            location.href = "/ihome/";
        }
    })
}

$(document).ready(function(){
    $.get('/ihome/user/', function (data){
        if(data.code == '200'){
            $('#user-name').html(data.name);
            $('#user-mobile').html(data.phone);
            $('#user-avatar').attr('src', data.avatar)
        }
    })
});
