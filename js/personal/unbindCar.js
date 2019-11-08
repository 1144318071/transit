$(function(){
   avalon.ready(function () {
       window.vmUnbindCar = avalon.define({
          $id : 'root',
           postData:{
              '_token_':'',
              'car_id':'',
               'code':''
           },
           mobile:'',
          onLoad:function(){
              vmUnbindCar.postData._token_ = localStorage.getItem('token');
              vmUnbindCar.postData.car_id = localStorage.getItem('unbindId');
              var userInfo = JSON.parse(localStorage.getItem('userInfo'));
              vmUnbindCar.mobile = userInfo.mobile;
          },
           setUnbind:function(){
              getAjax(API.URL_POST_VEHICLEUNTIED,'post',).then(function(res){
                    if(res.code == 200){

                    }else{
                        alertMsg(res.message,2);
                    }
               });
           },
           getCheckCode:function () {
               var phone = vmUnbindCar.mobile;
               if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
                   alertMsg("请输入正确格式的手机号",2);
                   $('.btn-gray').attr('disabled',true);
               }else{
                   var token = localStorage.getItem('token');
                   var getCode = {
                       '_token_': token,
                       'mobile': vmUnbindCar.mobile
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
                               'border':'1px solid #f00'
                           });
                           $('.btn-gray').text('重新发送(' + count + ')');
                       }
                       count--;
                   }, 1000);
               }
           }
       });
       vmUnbindCar.onLoad();
       avalon.scan(document.body);
   })
});