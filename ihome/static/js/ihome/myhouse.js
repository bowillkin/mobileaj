$(document).ready(function(){
    $(".auth-warn").show();
    $('.new-house').hide();
    $.get('/house/myhouse1/', function (data){
        if(data.code == '200'){
            $(".auth-warn").hide();
            $('.new-house').show();
            var house_html = '';
            for(var i=0;i<data.house_list.length;i++){
                house_html += '<li><a href="/house/detail/?house_id='  + data.house_list[i].id +'"><div class="house-title">';
                house_html += '<h3>房屋ID:' + data.house_list[i].id + ' —— ' + data.house_list[i].title + '</h3>';
                house_html += '</div><div class="house-content">';
                console.log(data.house_list[i]);
                house_html += '<img src="'+ data.house_list[i].image +'">';
                house_html += '<div class="house-text"><ul>';
                house_html += '<li>位于：'+ data.house_list[i].area +'</li>';
                house_html += '<li>价格：￥'+ data.house_list[i].price +'/晚</li>';
                house_html += '<li>发布时间：'+ data.house_list[i].create_time +'</li>';
                house_html += '</ul></div></div></a></li>'
            }
            $('#houses-list').append(house_html);
        }
    });
});


