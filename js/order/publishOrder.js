layui.use('upload', function () {
    var token = localStorage.getItem('token');
    $ = layui.$;
    upload = layui.upload;
    $.ajaxSetup({
        // 发送cookie
        xhrFields: {
            withCredentials: true
        },
    });
    upload.render({
        elem: '#test2',
        url: API.URL_POST_UPLOADFILE,
        data: {
            "_token_": token,
        },
        done: function (res) {
            /*if(res.code === 200){
                alertMsg(res.message,1);
                $('#license').attr('src', getApiHost + res.result.crop).css({'width': "88px", "height": '118px'});
                vmCompleteInfo.postData.business_license = res.result.crop;
            }else{
                alertMsg(res.message,2);
            }*/
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
$('.upload').hover(function () {
    $(this).find('.uploadimg').show();
}, function () {
    $(this).find('.uploadimg').hide();
});
$('.payWay button').click(function(){
   $(this).addClass('active').siblings().removeClass('active');
});
//下一步
$('.btn-next').click(function(){
    $('.formTitle').hide();
    $('.form').hide();
    $('.orderDetail').show();
});
$(function(){
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        //常规用法
        laydate.render({
            elem: '#test1'
        });
    });
    $('#distpicker').distpicker('reset', true);
    avalon.ready(function(){
       window.vmPublishOrder = avalon.define({
            $id : 'root',
           onLoad:function(){

           },
           /*提示设置支付密码*/
           payTip:function(){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['1127px', '639px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/payTip.html']
               });
           },
           //订单支付失败
           payFail:function(){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['883px', '432px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/payFailed.html']
               });
           },
           //订单支付成功
           paySuccess:function(){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['883px', '432px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/paySuccess.html']
               });
           }
       });
       vmPublishOrder.onLoad();
       avalon.scan(document.body);
    });
})