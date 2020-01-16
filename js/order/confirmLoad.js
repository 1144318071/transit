// 公共方法
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) < 0) {
        if(loginCode.indexOf(code)>=0){
            alertMsg(res.message,2);
            window.location.href='../../login.html';
        }else{
            alertMsg(res.message,2);
        }
    }
};
$(function(){
   window.vmLoad = avalon.define({
       $id : 'root',
       onLoad:function(){
       },
       confirm:function(){
           var token = localStorage.getItem('token');
           var loadId = localStorage.getItem('loadId');
           var postData = {
               '_token_':token,
               'order_id':loadId
           };
           getAjax(API.URL_POST_GOODSCONFIRMLOADING,'post',postData).then(function(res){
              if(res.code == 200){
                  alertMsg(res.message,1);
                  setTimeout(function(){
                      parent.layer.close(parent.layer.index);
                  },1000)
              }else{
                  checkToken(res);
              }
           });
       }
   });
   vmLoad.onLoad();
   avalon.scan(document.body);
});
