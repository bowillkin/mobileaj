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




//确认接单按钮函数
function confirm() {
    order_id = $('.modal-accept').attr('order_id');
    $.get('/booking/accept/',{'order_id':order_id},function (data) {
        if(data.code == '200'){
            $('#accept-modal').modal('hide');
            $('.order_id' + order_id).html('待支付');
            $('#'+ order_id ).hide();

        }
    })
}
//拒绝确认接单函数
function refuse(){
    order_id = $('.modal-reject').attr('order_id');
    comment = $('#reject-reason').val();
    $.get('/booking/refuse/',{'order_id':order_id,'comment':comment},function (data) {
        if(data.code == '200'){
            $('#reject-modal').modal('hide');
            $('.order_id' + order_id).html('已拒接');
            $('#'+ order_id ).hide();
            $('.form-control').val('')
        }else if (data.code == '2002'){
            alert(data.msg)
        }
    })

}


$(document).ready(function(){
    $.get('/booking/mylorders/', function (data) {
        var lorder_html = '';
        for(i=0; i<data.lorderlist.length; i++){
            lorder_html += '<ul class="orders-list">\n' +
                '                <li>\n' +
                '                    <div class="order-title">\n' +
                '                        <h3>订单编号：'+ data.lorderlist[i].order_id+'</h3>\n';
            if(data.lorderlist[i].status == 'WAIT_ACCEPT'){
                lorder_html +=
                '                        <div class="fr order-operate" id="'+data.lorderlist[i].order_id +'">\n' +
                '                            <button type="button" class="btn btn-success order-accept" data-toggle="modal" data-target="#accept-modal" >接单</button>\n' +
                '                            <button type="button" class="btn btn-danger order-reject" data-toggle="modal" data-target="#reject-modal">拒单</button>\n' +
                '                        </div>\n';
            }else{
                lorder_html +=
                '                        <div class="fr order-operate" style="display: none" id="'+data.lorderlist[i].order_id +'">\n' +
                '                            <button type="button" class="btn btn-success order-accept" data-toggle="modal" data-target="#accept-modal" >接单</button>\n' +
                '                            <button type="button" class="btn btn-danger order-reject" data-toggle="modal" data-target="#reject-modal">拒单</button>\n' +
                '                        </div>\n';
            }

            lorder_html += '                    </div>\n' +
                '                    <div class="order-content">\n' +
                '                        <img src="'+ data.lorderlist[i].image+'">\n' +
                '                        <div class="order-text">\n' +
                '                            <h3>'+ data.lorderlist[i].house_title+'</h3>\n' +
                '                            <ul>\n' +
                '                                <li>创建时间：'+ data.lorderlist[i].create_date+'</li>\n' +
                '                                <li>入住日期：'+ data.lorderlist[i].begin_date+'</li>\n' +
                '                                <li>离开日期：'+ data.lorderlist[i].end_date +'</li>\n' +
                '                                <li>合计金额：￥'+ data.lorderlist[i].amount+'(共'+ data.lorderlist[i].days+'晚)</li>\n' +
                '                                <li>订单状态：\n' +
                '                                    <span class="order_id'+data.lorderlist[i].order_id +'">';
                if(data.lorderlist[i].status == 'WAIT_ACCEPT'){
                    lorder_html += '待接单'
                }else if(data.lorderlist[i].status == 'WAIT_PAYMENT'){
                    lorder_html += '待支付'
                }else if(data.lorderlist[i].status == 'REJECTED'){
                    lorder_html += '已拒接'
                }
                lorder_html += '</span>\n' +
                '                                </li>\n' +
                '                                <li>客户评价： </li>\n' +
                '                            </ul>\n' +
                '                        </div> \n' +
                '                    </div>\n' +
                '                </li>\n' +
                '            </ul>\n' +
                '            <div class="modal fade" id="accept-modal" tabindex="-1" role="dialog" aria-labelledby="accept-label">\n' +
                '                <div class="modal-dialog" role="document">\n' +
                '                    <div class="modal-content">\n' +
                '                        <div class="modal-header">\n' +
                '                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>\n' +
                '                            <h4 class="modal-title">操作提示</h4>\n' +
                '                        </div>\n' +
                '                        <div class="modal-body">\n' +
                '                            <p>您确定接此订单吗？</p>\n' +
                '                        </div>\n' +
                '                        <div class="modal-footer">\n' +
                '                            <button type="button" class="btn btn-default " data-dismiss="modal">取消</button>\n' +
                '                            <button type="button" class="btn btn-primary modal-accept " onclick="confirm()" >确定接单</button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="modal fade" id="reject-modal" tabindex="-1" role="dialog" aria-labelledby="reject-label">\n' +
                '                <div class="modal-dialog" role="document">\n' +
                '                    <div class="modal-content">\n' +
                '                        <div class="modal-header">\n' +
                '                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>\n' +
                '                            <h4 class="modal-title">请输入拒接单原因</h4>\n' +
                '                        </div>\n' +
                '                        <div class="modal-body">\n' +
                '                            <textarea class="form-control" rows="3" id="reject-reason" placeholder="此处必须填写原因"></textarea>\n' +
                '                        </div>\n' +
                '                        <div class="modal-footer">\n' +
                '                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>\n' +
                '                            <button type="button" class="btn btn-primary modal-reject" onclick="refuse()">确定</button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>'
        }
        $('.orders-con').html(lorder_html);
        $('.order-accept').click(function () {
            order_id = $(this).parents('div').attr('id');
            $('.modal-accept').attr('order_id', order_id)
        });
        $('.order-reject').click(function () {
            order_id = $(this).parents('div').attr('id');
            $('.modal-reject').attr('order_id', order_id)
        })
    });

    $('.modal').on('show.bs.modal', centerModals);      //当模态框出现的时候
    $(window).on('resize', centerModals);
    $(".order-accept").on("click", function(){
        var orderId = $(this).parents("li").attr("order-id");
        $(".modal-accept").attr("order-id", orderId);
    });
    $(".order-reject").on("click", function(){
        var orderId = $(this).parents("li").attr("order-id");
        $(".modal-reject").attr("order-id", orderId);
    });
});