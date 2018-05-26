function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(document).ready(function(){

    $.get('/house/newhouse1/', function (data) {
        var area_html = '';
        for(var i=0; i<data.areas_list.length; i++){
            area_html += '<option value="'+ data.areas_list[i].id +'">' + data.areas_list[i].name + '</option>';

        }
        $('#area-id').html(area_html);

        var facility_html = '';
        for(var j=0; j<data.facilitys_list.length; j++){
            facility_html += '<li><div class="checkbox"><label>';
            facility_html += '<input type="checkbox" name="facility" id="facility" value="' + data.facilitys_list[j].id + '">' + data.facilitys_list[j].name;
            facility_html += '</label></div></li>';
        }
        $('.clearfix').html(facility_html);
    })
});

function my_public() {
    title = $('#house-title').val();
    price = $('#house-price').val();
    area = $('#area-id').val();
    address = $('#house-address').val();
    room_count = $('#house-room-count').val();
    acreage = $('#house-acreage').val();
    unit = $('#house-unit').val();
    capacity = $('#house-capacity').val();
    beds = $('#house-beds').val();
    deposit = $('#house-deposit').val();
    min_days = $('#house-min-days').val();
    max_days = $('#house-max-days').val();
    facility = $('input[name="facility"]:checked').serialize();
    $.ajax({
        url:'/house/mypublic/',
        type:'POST',
        dataType:'json',
        data:{'title':title,'price':price,'area':area,'address':address,'room_count':room_count,'acreage':acreage,'unit':unit,'capacity':capacity,'beds':beds,'deposit':deposit,'min_days':min_days,'max_days':max_days,'facility':facility},
        success: function (data) {
            alert(data.msg);
            $('#form-house-info').hide();
            $('#form-house-image').show()
        },
        error: function (data) {

        }
    })
}

function upload_image() {
    var formData = new FormData($("#form-house-image")[0]);
    $.ajax({
        type : "POST",
        data : formData,
        url : '/house/upload/',
        dataType : 'json',
        contentType: false, //必须
        processData: false, //必须
        success : function(data) {
            alert(data.code);
            if (data.code == '200'){
                var icon_html = '<img src="' + data.url + '">';
                $('.house-image-cons').append(icon_html);
            }else{
                alert(data.msg);
            }
        },
        error : function(data) {
            alert(data.msg);
        }
    });
}