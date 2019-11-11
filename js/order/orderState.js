layui.use('upload', function () {
    var token = localStorage.getItem('token');
    var $ = layui.jquery,
        upload = layui.upload;
    $.ajaxSetup({
        // 发送cookie
        xhrFields: {
            withCredentials: true
        },
    });
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1',
        data:{
            '_token_':token
        },
        url: API.URL_POST_UPLOADFILE,
        done: function (res) {
            vmOrderState.imgCount = parseInt(vmOrderState.imgCount);
            if(vmOrderState.imgCount < 6){
                //上传成功
                if(res.code == 200){
                    var html = '<li class="delImg"><img class="img_reason" src="'+getApiHost+res.result.crop+'" data-src="'+res.result.crop+'" width="135px" height="147px" alt=""><span class="del">X</span></li>';
                    $('.uploadContent').append(html);
                    vmOrderState.imgCount +=1;
                }
            }else{
                alertMsg('最多可以上传6张图片',2);
            }
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
$('.uploadContent').delegate('.del','click',function () {
    $(this).parent().remove();
})
$(function () {
    avalon.ready(function () {
        window.vmOrderState = avalon.define({
            $id: 'root',
            imgCount:'0',
            postData:{
                '_token_':'',
                'order_id':'',
                'reason':'货物损坏/获取丢失',
                'certificate':'',
                'remark':''
            },
            onLoad: function () {

            },
            return: function () {
                parent.layer.close(parent.layer.index);
            },
            stateSuccess:function(){
                vmOrderState.postData._token_ = localStorage.getItem('token');
                vmOrderState.postData.order_id = localStorage.getItem('stateId');
                var imgs = document.getElementsByClassName('img_reason');
                var len = imgs.length;
                var imgsArr = [];
                if(len == 0){
                    alertMsg('请上传图片',2);
                    return false;
                }else{
                    for(var i=0;i<len;i++){
                        var src = $(imgs[i]).attr('data-src');
                        imgsArr.push(src);
                    }
                };
                vmOrderState.postData.certificate = imgsArr.join(',');
                console.log(vmOrderState.postData);
                if(vmOrderState.postData.certificate == ''){
                    alertMsg('请上传凭证',2);
                }else{
                    getAjax(API.URL_POST_GOODSCOMPLAINT,'post',vmOrderState.postData).then(function(res){
                        if(res.code == 200){
                            top.layer.open({
                                type: 2,
                                title: false,
                                skin: 'layui-layer-demo', //样式类名
                                closeBtn: 1, //不显示关闭按钮
                                area: ['876px', '513px'],
                                shadeClose: true, //开启遮罩关闭
                                content: ['/views/order/muckStateSuccess.html']
                            });
                        }else{
                            alertMsg(res.message,2);
                        }
                    });
                }
            },

        });
        vmOrderState.onLoad();
        avalon.scan(document.body)
    });
});