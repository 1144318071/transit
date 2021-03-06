$(function () {
    avalon.ready(function () {
        window.vmChangePayCode = avalon.define({
            $id: 'root',
            username:'',
            postData:{
                '_token_':'',
                'code': '',
                'payment_password': '',
                'payment_password_confirm': '',
				'_m':''
            },
            onLoad: function () {
            },
            // 获取验证码
            getCheckCode:function(){
            	var phone = vmChangePayCode.username;
            	vmChangePayCode.postData._m = phone;
            	if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
			       alertMsg("请输入正确格式的手机号",2);
			       $('.layui-btn-Code').attr('disabled',true);
			    }else{
			    	var token  = localStorage.getItem('token');
	                var getCode = {
	                    '_token_': token,
	                    'mobile': vmChangePayCode.username
	                };
	                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
	                	if(res.code == 200){
							alertMsg(res.message,1);
						}else{
							let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
							let code = res.code;
							if (tokenCode.indexOf(code) < 0) {
								alertMsg(res.message,2);
							}
						}
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
			    }
            },
            // 修改支付密码
            changePayCode:function(){
                vmChangePayCode.postData._token_ = localStorage.getItem('token');
                vmChangePayCode.postData._t = localStorage.getItem('_t');
                getAjax(API.URL_POST_SETPAYMENT,'post',vmChangePayCode.postData).then(function(res){
                	if(res.code == 200){
						alertMsg(res.message,1);
						location.href ='../../views/personal/personal.html';
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
        vmChangePayCode.onLoad();
        avalon.scan(document.body);
    });
});
