// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmAddBankCard.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
}
$(function () {
    avalon.ready(function () {
        window.vmAddBankCard = avalon.define({
            $id: 'root',
            postData:{
                '_token_':'',
                'account_name':'',
                'bank':'',
                'card_number':'',
                'mobile':'',
                'code':''
            },
            onLoad: function () {
                vmAddBankCard.getUserInfo();
            },
            // 取消
            cancel: function () {
                parent.layer.close(parent.layer.index);
            },
            // 获取验证码
            getCheckCode: function () {
                let count = 60;
                var token = localStorage.getItem('token');
                var getCode = {
                    '_token_': token ,
                    'mobile': vmAddBankCard.postData.mobile
                };
                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        checkToken(res);
                    }
                });
                const countDown = setInterval(() => {
                    if (count == 0) {
                        $('.btn-gray').text('获取验证码').removeAttr('disabled');
                        clearInterval(countDown);
                    } else {
                        $('.btn-gray').attr('disabled', true);
                        $('.btn-gray').css({
                            'background': '#ff0000',
                            'cursor': 'pointer',
                            'border': '1px solid #f00'
                        });
                        $('.btn-gray').text('重新发送(' + count + ')');
                    }
                    count--;
                }, 1000);
            },
            getUserInfo:function(){
                var userInfo  = JSON.parse(localStorage.getItem('userInfo'));
                vmAddBankCard.postData.mobile = userInfo.mobile;
                vmAddBankCard.postData.account_name = userInfo.actual_name;
            },
            //添加银行卡
            addBankCard:function(){
                vmAddBankCard.postData._token_ = localStorage.getItem('token');
                console.log(vmAddBankCard.postData)
                getAjax(API.URL_POST_BANKADD,'post',vmAddBankCard.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        checkToken(res);
                    }
                });
            }
        });
        vmAddBankCard.onLoad();
        avalon.scan(document.body);
    });
});
