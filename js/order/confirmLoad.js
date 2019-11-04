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
              }
           });
       }
   });
   vmLoad.onLoad();
   avalon.scan(document.body);
});