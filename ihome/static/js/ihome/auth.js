function showSuccessMsg() {
    $('.popup_con').fadeIn('fast', function() {
        setTimeout(function(){
            $('.popup_con').fadeOut('fast',function(){}); 
        },1000) 
    });
}

function my_auth1(){
    id_name = $('#real-name').val();
    id_card = $('#id-card').val();
    $.ajax({
        url:'/ihome/auth/',
        type:'POST',
        dataType:'json',
        data:{'id_name': id_name, 'id_card': id_card},
        success:function(data){
            if(data.code=='200'){
                alert('保存成功');
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

$.get('/ihome/auths/', function (data) {
    if(data.code == '200'){
        if(data.id_card){
            $('.btn-success').hide()
        }else {
            $('.btn-success').show()
        }
    }

});

function my_auth2(){
    id_name = $('#real-name').val();
    id_card = $('#id-card').val();
    $.ajax({
        url:'/ihome/auth/',
        type:'POST',
        dataType:'json',
        data:{'id_name': id_name, 'id_card': id_card},
        success:function(data){
            if(data.code=='200'){
                alert('保存成功');
                $('.error-msg').hide();
                $('.btn-success').hide()
                // location.href = '/ihome/my/'
            }else{
                // 这个标签默认是display=None的, 可以用show来展示
                $('.error-msg').html('<i class="fa fa-exclamation-circle"></i>' + data.msg);
                $('.error-msg').show()
            }
        },
        error:function(data){
            alert(data.msg)
        }
    })

}