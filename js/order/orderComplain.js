/*layui.use('upload', function () {
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
            if(res.code === 200){
                alertMsg(res.message,1);
                var html = '<li class="delItem ml10"><img src="'+ getApiHost + res.result.crop +'" data-src="' + res.result.crop +'" class="img_upload"  width="117px" height="89px" alt=""><span class="del">X</span></li>';
                $('.imgItem').append(html);
                var imgLength = document.getElementsByClassName('img_upload').length;
                if(imgLength == 6){
                    $('#test2').attr('disabled',true);
                }
            }else{
                alertMsg(res.message,2);
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
});*/
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
$('.imgItem').delegate('.del','click',function(){
    $(this).parent().remove();
});
// 公共方法
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmOrderComplain.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
};
$(function () {
    avalon.ready(function () {
        window.vmOrderComplain = avalon.define({
            $id: 'root',
            postData:{
                '_token_':'',
                'order_id':'',
            },
            certificate:[],
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
                vmOrderComplain.postData._token_ = token;
                vmOrderComplain.postData.order_id = order_id;
                var postData = {
                    '_token_':token,
                    'order_id':order_id
                };
                getAjax(API.URL_GET_COMPLAININFO,'get',postData).then(function(res){
                    if(res.code == 200){
                        vmOrderComplain.stateDetail = res.result;
                        var certificate = res.result.certificate.split(',');
                        for(var i=0;i<certificate.length;i++){
                            var src = getApiHost + certificate[i];
                            vmOrderComplain.certificate.push(src);
                        }
                    }else{
                        checkToken(res);
                    }
                });
            },
            /*取消投诉*/
            cancelComplain:function(){
                getAjax(API.URL_POST_CLOSECOMPLAIN,'post',vmOrderComplain.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        setTimeout(function(){
                            parent.layer.close(parent.layer.index);
                        },1000);
                    }else{
                        checkToken(res);
                    }
                });
            }
        });
        vmOrderComplain.onLoad();
        avalon.scan(document.body)
    });
});
