$(function(){

    avalon.ready(function(){
        window.vmLogin = avalon.define({
            $id:'root',
            onLoad:function(){
            },
             // 切换密码登录
            changePwdShow:function(pwd,code){
                $(pwd).show();
                $(code).hide();
            },
            // 切换验证码登录
            changeCodeShow: function (pwd, code) {
                $(pwd).hide();
                $(code).show();
            },
            // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
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
            }
        });
        vmLogin.onLoad();
        avalon.scan(document.body);
    });
});