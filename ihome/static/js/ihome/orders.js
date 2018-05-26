//模态框居中的控制
function centerModals(){
    $('.modal').each(function(i){   //遍历每一个模态框
        var $clone = $(this).clone().css('display', 'block').appendTo('body');    
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top-30);  //修正原先已经有的30个像素
    });
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(document).ready(function(){

    $('.modal').on('show.bs.modal', centerModals);      //当模态框出现的时候
    $(window).on('resize', centerModals);
    $(".order-comment").on("click", function(){
        var orderId = $(this).parents("li").attr("order-id");
        $(".modal-comment").attr("order-id", orderId);
    });
    $.get('/booking/myorders/', function (data) {
        order_html = '';
        for(var i=0; i<data.myorderlist.length;i++){
            order_html += '<li>\n' +
                '    <div class="order-title">\n' +
                '        <h3>订单编号：' +data.myorderlist[i].order_id + '</h3>\n' +
                '        <div class="fr order-operate">\n' +
                '            <button type="button" class="btn btn-success order-comment" data-toggle="modal" data-target="#comment-modal">发表评价</button>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="order-content">\n' +
                '        <img src="'+ data.myorderlist[i].image+'">\n' +
                '        <div class="order-text">\n' +
                '            <h3>'+ data.myorderlist[i].house_title+'</h3>\n' +
                '            <ul>\n' +
                '                <li>创建时间：'+ data.myorderlist[i].create_date+'</li>\n' +
                '                <li>入住日期：'+ data.myorderlist[i].begin_date+'</li>\n' +
                '                <li>离开日期：'+ data.myorderlist[i].end_date+'</li>\n' +
                '                <li>合计金额：￥'+ data.myorderlist[i].amount+'(共'+ data.myorderlist[i].days+'晚)</li>\n' +
                '                <li>订单状态：\n' +
                '                    <span>'+ data.myorderlist[i].status+'</span>\n' +
                '                </li>\n' +
                '                <li>我的评价： </li>\n' +
                '                <li>拒单原因： </li>\n' +
                '            </ul>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</li>'
        }
        $('.orders-list').html(order_html);
    })
});