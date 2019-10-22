$(function () {
    avalon.ready(function () {
        window.vmChangePayCode = avalon.define({
            $id: 'root',
            username:'',
            postData:{
                '_token_':'',
                'code': '',
                'payment_password': '',
                'payment_password_confirm': ''
            },
            onLoad: function () {
            },
            // 获取验证码
            getCheckCode:function(){
                var token  = localStorage.getItem('token');
                var getCode = {
                    '_token_': token,
                    'mobile': vmChangePayCode.username
                };
                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                    alertMsg(res.message,1);
                });
                let count = 60;
                const countDown = setInterval(()=>{
                    if(count == 0){
                        $('.layui-btn-Code').text('获取验证码').removeAttr('disabled');
                        $('.layui-btn-Code').css({'background':'#999','cursor':'pointer'});
                        clearInterval(countDown);
                    }else{
                        $('.layui-btn-Code').attr('disabled',true);
                        $('.layui-btn-Code').css({'background':'#ff0000','cursor':'pointer'});
                        $('.layui-btn-Code').text('重新发送(' + count+')');
                    }
                    count--;
                },1000);
            },
            // 修改支付密码
            changePayCode:function(){
                vmChangePayCode.postData._token_ = localStorage.getItem('token');
                vmChangePayCode.postData._t = localStorage.getItem('_t');
                getAjax(API.URL_POST_SETPAYMENT,'post',vmChangePayCode.postData).then(function(res){
                    alertMsg(res.message,1);
                });
            }
        });
        vmChangePayCode.onLoad();
        avalon.scan(document.body);
    });
});