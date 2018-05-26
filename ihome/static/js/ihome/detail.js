function hrefBack() {
    history.go(-1);
}

function decodeQuery(){
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function(result, item){
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

$(document).ready(function(){
    
    
    var path =location.search;
    var house_id = path.split('=')[1];
    $.get('/house/get_detail/'+ house_id +'/', function (data) {
        if(data.code == '200') {
            if(data.mine){
                $(".book-house").hide();
            }else{
                $(".book-house").show();
            }
            var image_html = '';
            for (var i = 0; i < data.image_list.length; i++) {
                image_html += '<li class="swiper-slide"><img src="' + data.image_list[i].url + '"></li> ';                
            }
            $('.swiper-wrapper').html(image_html);
            //轮播函数
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                pagination: '.swiper-pagination',
                paginationType: 'fraction'
            });
            $('.swiper-container').append('<div class="house-price">￥<span>'+  data.house.price +'</span>/晚</div>\n' +
                '</div>');
            $('.detail-header').html('<h2 class="house-title">'+ data.house.title +'</h2><div class="landlord-pic"><img src="'+ data.house.user_avatar +'"></div><h2 class="landlord-name">房东： <span>'+ data.house.user_name +'</span></h2>')
            $('.text-center').html('<li>'+ data.house.address + +'</li>')
            $('.icontext1').html('<h3>出租'+ data.house.room_count +'间</h3>\n' +
                '                 <p>房屋面积:'+ data.house.acreage +'平米</p> \n' +
                '                 <p>房屋户型:'+ data.house.unit +'</p>')
            $('.icontext2').html('<h3>宜住'+ data.house.capacity +'人</h3>');
            $('.icontext3').html(' <h3>卧床配置</h3>\n' +
                '                   <p>'+ data.house.beds +'</p>')
            $('#my01').html('                    <li>收取押金<span>'+     data.house.deposit +'</span></li>\n' +
                '                    <li>最少入住天数<span>'+ data.house.min_days +'</span></li>\n' +
                '                    <li>最多入住天数<span>'+ data.house.max_days +'</span></li>');
            var facility_html = ''
            for(var j=0;j<data.house.facilities.length; j++){
                facility_html += '<li><span class="'+ data.house.facilities[j].css +'"></span>'+ data.house.facilities[j].name +'</li>'
            }
            $('#my02').html(facility_html)
            
        }    
    })
});

function my_book() {
    var path =location.search;
    var house_id = path.split('=')[1];
    location.href = '/booking/?house_id='+ house_id;
}


