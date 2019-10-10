$(function(){
    layui.use('element', function () {
        var element = layui.element;
    });
    avalon.ready(function(){
        window.vmLogin = avalon.define({
            $id:'root',
            postData:{
                '_token_':'',
                'type':'pc',
                't': '', //PERSONAL（个人） MERCHANT（商家） LOGISTICS（物流公司） PROXY （区域代理）
                'code':'',//短信验证码登录
                'password':'',//密码登录
                'm':'',//登录方式 m:code(短信验证) m:pwd(密码登录)
                'username':''//用户名或者手机号
            },
            onLoad:function(){
               
            },
             // 切换密码登录
            changePwdShow:function(pwd,code){
                vmLogin.postData.code='';
                vmLogin.postData.password='';
                vmLogin.postData.username='';
                $(pwd).show();
                $(code).hide();
            },
            // 切换验证码登录
            changeCodeShow: function (pwd, code) {
                vmLogin.postData.code = '';
                vmLogin.postData.password = '';
                vmLogin.postData.username = '';
                $(pwd).hide();
                $(code).show();
            },
            // 切换登录方式
            changeLoginWay:function(){
                vmLogin.postData.code = '';
                vmLogin.postData.password = '';
                vmLogin.postData.username = '';
            },
            // 登录(账号密码登录)
            signIn:function(){
                vmLogin.postData._token_ = localStorage.getItem('token');
                getAjax(API.URL_POST_USERLOGIN,'post',vmLogin.postData).then(function(res){
                    localStorage.setItem('userInfo',JSON.stringify(res.result));
                    var userInfo = res.result;
                    //没有进行实名认证
                    if(userInfo.verfied){
                        location.href = '../index.html';
                    }else{
                        var type = res.result.type;
                        // 商家登陆
                        switch(type){
                            case 'PERSONAL':
                                location.href = '../index.html';
                                break;
                            case 'MERCHANT':
                                location.href = '../views/login/completeInfo.html';
                                break;
                            case 'LOGISTICS':
                                location.href = '../views/login/completeInfo.html';
                                break;
                            case 'PROXY':
                                location.href = '../views/login/changePwd.html';
                                break;
                            default:
                                break;
                        };
                    }
                });
            },
            // 司机密码登录
            driverPwdLogin:function(){
                vmLogin.postData.t = 'PERSONAL';
                vmLogin.postData.m = 'pwd';
                vmLogin.signIn();
            },
            // 司机验证码登录
            driverCodeLogin:function(){
                vmLogin.postData.t = 'PERSONAL';
                vmLogin.postData.m = 'code';
                vmLogin.signIn();
            },
            // 合作商家面密码登录
            coPwdLogin:function(){
                vmLogin.postData.t = 'MERCHANT';
                vmLogin.postData.m = 'pwd';
                vmLogin.signIn();
            },
            // 合作商家验证码登录
            coCodeLogin:function(){
                vmLogin.postData.t = 'MERCHANT';
                vmLogin.postData.m = 'code';
                vmLogin.signIn();
            },
            // 区域代理密码登录
            agentPwdLogin:function(){
                vmLogin.postData.t = 'PROXY';
                vmLogin.postData.m = 'pwd';
                vmLogin.signIn();
            },
            // 区域代理验证码登录
            agentCodeLogin:function(){
                vmLogin.postData.t = 'PROXY';
                vmLogin.postData.m = 'code';
                vmLogin.signIn();
            },
             // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
                var token  = localStorage.getItem('token');
                var getCode = {
                    '_token_': token,
                    'mobile': vmLogin.postData.username
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
            // 忘记密码跳转
            forgetPwd:function(el){
                localStorage.setItem('_t',el);
                location.href = '../views/login/forgetPwd.html';
            }   
        });
        vmLogin.onLoad();
        avalon.scan(document.body);
    });
});