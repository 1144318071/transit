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
                       alertMsg(res.message,2);
                   }
                });
            }
       });
       vmSetDefault.onLoad();
       avalon.scan(document.body);
    });
});