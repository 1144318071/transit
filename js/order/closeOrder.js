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
//
$(function(){
    avalon.ready(function(){
        window.vmCloseOrder = avalon.define({
            $id : 'root',
            onLoad:function(){

            },
            return:function(){
                parent.layer.close(parent.layer.index);
            },
            closeOrder:function(){
                var token = localStorage.getItem('token');
                var cancelId = localStorage.getItem('cancelId');
                var postData={
                    '_token_': token,
                    'order_id':cancelId
                };
                getAjax(API.URL_POST_CLOSEORDER,'post',postData).then(function (res) {
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        window.parent.location.reload();
                        setTimeout(function(){
                            parent.layer.close(parent.layer.index);
                        },1000);
                    }
                })
            }
        });
        vmCloseOrder.onLoad();
        avalon.scan(document.body)
    });
});