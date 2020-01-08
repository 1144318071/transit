// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmSetDefault.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
}
$(function(){
    avalon.ready(function(){
       window.vmSetDefault = avalon.define({
            $id : 'root',
           cardInfo:'',
            onLoad:function(){
                vmSetDefault.getCardInfo();
            },
            getCardInfo:function(){
                var token = localStorage.getItem('token');
                var card_id = localStorage.getItem('bankId');
                var postData={
                    '_token_':token,
                    'card_id':card_id
                };
                getAjax(API.URL_GET_BANKINFO,'get',postData).then(function(res){
                   if(res.code == 200){
                       res.result.card_number = stringHidePart(res.result.card_number)
                       vmSetDefault.cardInfo = res.result;
                   }else{
                       checkToken(res);
                   }
                });
            }
       });
       vmSetDefault.onLoad();
       avalon.scan(document.body);
    });
});
