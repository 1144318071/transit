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
            onLoad:function(){
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                vmChangePhone.stepOne.username = userInfo.mobile;
            },
            // 下一步
            nextStep:function(){
                var token = localStorage.getItem('token');
                vmChangePhone.stepOne._token_ = token;
                vmChangePhone.stepTwo._token_ = token;
                getAjax(API.URL_POST_CHANGEPHONEONE, 'post', vmChangePhone.stepOne).then(function (res) {
                    if(res.code == 200){
                        $('.pwdMsg').hide();
                        $('.codeMsg').show();
                        vmChangePhone.stepTwo.verify_code = res.result.verify_code;
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
                    }
                });
            },
            // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
            	var phone = vmChangePhone.stepTwo.username;
			    if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
			       alertMsg("请输入正确格式的手机号",2);
			       $('.layui-btn-Code').attr('disabled',true);
			    }else{
                    $('.layui-btn-Code').removeAttr('disabled');
			    	let token  = localStorage.getItem('token');
                    let getCode = {
	                    '_token_': token,
	                    'mobile': vmChangePhone.stepTwo.username
	                };
	                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
	                    if(res.code == 200){
	                        alertMsg(res.message,1)
                        }else{
                            alertMsg(res.message,2);
                        }
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
			    }
            },
            // 确认修改密码
            changePwd:function(){
                getAjax(API.URL_POST_CHANGEPHONETWO,'post',vmChangePhone.stepTwo).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        setTimeout(function(){
                            location.href = '../../views/login.html'
                        },2000)
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
                    }
                });
            }
        });
        vmChangePhone.onLoad();
        avalon.scan(document.body);
    });
});
