$(document).ready(function () {
    var path = location.search;
    house_id = path.split('=')[1]   ;
    $.get('/booking/mybook1/', {house_id:house_id},function (data) {
        $('.house-text').html('<h3>'+ data.title+'</h3>\n' +
            '                <p>￥<span>'+ data.price+'</span>/晚</p>');
        $('#my03').attr('src', data.house_index_image);

    })

});


function my_book_submit() {
    var path = location.search;
    house_id = path.split('=')[1];
    start_date = $('#start-date').val();
    end_date = $('#end-date').val();
    $.post('/booking/get_order/', {house_id:house_id,start_date:start_date,end_date:end_date},function (data) {
        location.href = '/ihome/'
    })

}



function hrefBack() {
    history.go(-1);
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function decodeQuery(){
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function(result, item){
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

function showErrorMsg() {
    $('.popup_con').fadeIn('fast', function() {
        setTimeout(function(){
            $('.popup_con').fadeOut('fast',function(){}); 
        },1000) 
    });
}

$(document).ready(function(){
    $(".input-daterange").datepicker({
        format: "yyyy-mm-dd",
        startDate: "today",
        language: "zh-CN",
        autoclose: true
    });
    $(".input-daterange").on("changeDate", function(){
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();

        if (startDate && endDate && startDate > endDate) {
            showErrorMsg();
        } else {
            var sd = new Date(startDate);
            var ed = new Date(endDate);
            days = (ed - sd)/(1000*3600*24) + 1;
            var price = $(".house-text>p>span").html();
            var amount = days * parseFloat(price);
            $(".order-amount>span").html(amount.toFixed(2) + "(共"+ days +"晚)");
        }
    });
})
