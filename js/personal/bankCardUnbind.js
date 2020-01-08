function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmUnbind.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
}
$(function () {
    avalon.ready(function () {
        window.vmUnbind = avalon.define({
            $id: 'root',
            mobile:'',
            base:{
                'token':'',
                'bankId':''
            },
            postData:{
                '_token_':'',
                'card_id':'',
                'code':'',
                'type':'pc'
            },
            userInfo:{},
            cardInfo:{},
            onLoad: function () {
                vmUnbind.getUserInfo();
            },
            // 获取验证码
            getCheckCode: function () {
                var token  = localStorage.getItem('token');
                var getCode = {
                    '_token_': token,
                    'mobile': vmUnbind.userInfo.mobile
                };
                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        alertMsg(res.message,2);
                    }
                });
                let count = 60;
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
            cancel: function () {
                parent.layer.close(parent.layer.index);
            },
            getUserInfo:function(){
                var token = localStorage.getItem('token');
                vmUnbind.base.token = token;
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_':token}).then(function(res){
                   if(res.code == 200){
                       vmUnbind.userInfo = res.result;
                       vmUnbind.mobile = res.result.mobile;
                       vmUnbind.getCardInfo();
                   }else{
                       checkToken(res);
                   }
                });
            },
            getCardInfo:function(){
                var card_id = localStorage.getItem('bankId');
                vmUnbind.base.bankId = card_id;
                var postData = {
                    '_token_':vmUnbind.base.token,
                    'card_id':card_id
                };
                getAjax(API.URL_GET_BANKINFO,'get',postData).then(function(res){
                    if(res.code == 200){
                        res.result.card_number = stringHidePart(res.result.card_number);
                        res.result.mobile = stringHidePhone(vmUnbind.mobile);
                        vmUnbind.cardInfo = res.result;
                        console.log(res.result)
                    }else{
                        checkToken(res);
                    }
                });
            },
            unbind:function(){
                vmUnbind.postData._token_ = vmUnbind.base.token;
                vmUnbind.postData.card_id = vmUnbind.base.bankId;
                getAjax(API.URL_POST_BANKUNTIED,'post',vmUnbind.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        /*setTimeout(function(){
                            window.parent.location.reload();
                            parent.layer.close(parent.layer.index);
                        },1000);*/
                    }else{
                        checkToken(res);
                    }
                })
            },
        });
        vmUnbind.onLoad();
        avalon.scan(document.body);
    });
});
