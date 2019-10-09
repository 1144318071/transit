$(function(){
    avalon.ready(function(){
        window.vmChangePhone = avalon.define({
            $id : 'root',
            stepOne:{
                '_token_':'',
                'username':'',
                'password':'',
                '_t':'pwd',
                'code':''
            },
            stepTwo:{
                '_token_':'',
                'username':'',
                'verify_code':'',
                'code':''//短信验证码
            },
            onLoad:function(){},
            // 下一步
            nextStep:function(){
                var token = localStorage.getItem('token');
                vmChangePhone.stepOne._token_ = token;
                vmChangePhone.stepTwo._token_ = token;
                getAjax(API.URL_POST_CHANGEPHONEONE, 'post', vmChangePhone.stepOne).then(function (res) {
                    $('.pwdMsg').hide();
                    $('.codeMsg').show();
                    vmChangePhone.stepTwo.verify_code = res.result.verify_code;
                });
            },
            // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
                var token  = localStorage.getItem('token');
                var getCode = {
                    '_token_': token,
                    'mobile': vmChangePhone.stepTwo.username
                };
                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                    alertMsg(res.message,1)
                    console.log(res);
                });
                let count = 60;
                const countDown = setInterval(()=>{
                    if(count == 0){
                        $('.layui-btn-Code').text('获取验证码').removeAttr('disabled');
                        clearInterval(countDown);
                    }else{
                        $('.layui-btn-Code').attr('disabled',true);
                        $('.layui-btn-Code').css({'background':'#ff0000','cursor':'pointer'});
                        $('.layui-btn-Code').text('重新发送(' + count+')');
                    }
                    count--;
                },1000);
            },
            // 确认修改密码
            changePwd:function(){
                getAjax(API.URL_POST_CHANGEPHONETWO,'post',vmChangePhone.stepTwo).then(function(res){
                    alertMsg(res.message,1);
                    setTimeout(function(){

                    },2000)
                });
            }
        });
        vmChangePhone.onLoad();
        avalon.scan(document.body);
    });
});