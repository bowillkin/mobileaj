function showSuccessMsg() {
    $('.popup_con').fadeIn('fast', function() {
        setTimeout(function(){
            $('.popup_con').fadeOut('fast',function(){}); 
        },1000) 
    });
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function my_put(){
    username = $('#user-name').val();
    // 下面为创建一个FormData对象去包装form-avatar表单, 就可以提交ajax提交文件了!
    var formData = new FormData($("#form-avatar")[0]);
    formData.append('username',username);
    $.ajax({
        type : "PUT",
        data : formData,
        url : '/ihome/profile/',
        dataType : 'json',
        contentType: false, //必须
        processData: false, //必须
        success : function(data) {
            if (data.code == '200'){
            $('#user-avatar').attr('src', data.url);
            console.log('success');
            $('#user-name').val(data.name)
            }else{
                $('#user-name').val(data.user_name);
                alert(data.msg);
            }
        },
        error : function() {
            alert(data.msg);
            console.log('error');
        }
    });
}

