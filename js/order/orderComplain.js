layui.use('upload', function () {
    var $ = layui.jquery,
        upload = layui.upload;
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1',
        url: '/upload/',
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            //上传成功
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
});
// 上传图片
$('.upload').hover(function () {
    $(this).find('.uploadimg').show();
}, function () {
    $(this).find('.uploadimg').hide();
});
// 删除图片
$('.del').click(function () {
    $(this).parent().remove();
});
$(function () {
    avalon.ready(function () {
        window.vmOrderComplain = avalon.define({
            $id: 'root',
            stateDetail:{},
            onLoad: function () {
                vmOrderComplain.getOrderDetail();
            },
            return: function () {
                parent.layer.close(parent.layer.index);
            },
            getOrderDetail:function(){
                var token = localStorage.getItem('token');
                var order_id = localStorage.getItem('stateId');
                var postData = {
                    '_token_':token,
                    'order_id':order_id
                };
                getAjax(API.URL_GET_COMPLAININFO,'get',postData).then(function(res){
                    if(res.code == 200){
                        vmOrderComplain.stateDetail = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            }
        });
        vmOrderComplain.onLoad();
        avalon.scan(document.body)
    });
});