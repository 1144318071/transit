$(function () {
    avalon.ready(function () {
        window.vmForgetPwd = avalon.define({
            $id: 'root',
            postData:{
                '_token_':'',
                'username': '',
                'code': '',
                'password': '',
                'password_confirm': '',
                '_t': '', //PERSONAL（个人） MERCHANT（商家） LOGISTICS（物流公司） PROXY （区域代理）
            },
            onLoad: function () {
            },
            // 获取验证码
            getCheckCode:function(){
            	var phone = vmForgetPwd.postData.username;
			    if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
			       alertMsg("请输入正确格式的手机号",2);
			    }else{
			    	var token  = localStorage.getItem('token');
	                var getCode = {
	                    '_token_': token,
	                    'mobile': vmForgetPwd.postData.username
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
            // 修改密码
            changePwd:function(){
                vmForgetPwd.postData._token_ = localStorage.getItem('token');
                vmForgetPwd.postData._t = localStorage.getItem('_t');
                getAjax(API.URL_POST_CHANGEPWD,'post',vmForgetPwd.postData).then(function(res){
                	if(res.code ==200){
						alertMsg(res.message,1);
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
        vmForgetPwd.onLoad();
        avalon.scan(document.body);
    });
});
