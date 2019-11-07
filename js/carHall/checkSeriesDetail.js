$('.tabTitle li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabDetail').eq($(this).index()).show().siblings().hide();
});
$(function(){
   avalon.ready(function(){
      window.vmCheckSeriesDetail = avalon.define({
         $id:'root',
          carInfo:{},
          postData:{
             '_token_':'',
              'carId' : '',
              'type':''
          },
          appearance_pic:[],
          interior_pic:[],
          chassis_pic:[],
          tops_pic:[],
          other_pic:[],
          hotCarList:[],
          onLoad:function(){
             vmCheckSeriesDetail.getUrlJson();
          },
          getUrlJson:function(){
             var url = window.location.href;
             var jsonData = GetRequest(url);
             var token = localStorage.getItem('token');
             vmCheckSeriesDetail.postData._token_ = token;
             vmCheckSeriesDetail.postData.carId = jsonData.id;
             vmCheckSeriesDetail.postData.type = jsonData.car_ty;
             vmCheckSeriesDetail.getCarInfo();
             vmCheckSeriesDetail.getHorCar();
             if(jsonData.car_ty == 'ENERGY'){
                $('.traditionalDetail').remove();
             }else{
                 $('.newEnergyDetail').remove();
             }
          },
          getCarInfo : function(){
             getAjax(API.URL_GET_CARINFO,'get',vmCheckSeriesDetail.postData).then(function(res){
                 if(res.code == 200){
                     if(res.result.image != ''){
                         res.result.image = getApiHost + res.result.image;
                     }
                     vmCheckSeriesDetail.carInfo = res.result;
                 }else{
                     alertMsg(res.message,2);
                 }
             });
          },
          //热销车型
          getHorCar:function(){
                getAjax(API.URL_GET_HOTCAR,'get',{'_token_':vmCheckSeriesDetail.postData._token_}).then(function(res){
                    if(res.code == 200){
                        for(var i in res.result){
                            if(res.result[i].appearance_pic !=''){
                                res.result[i].appearance_pic = getApiHost +  res.result[i].appearance_pic;
                            }
                        }
                        vmCheckSeriesDetail.hotCarList = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
          }
      });
      vmCheckSeriesDetail.onLoad();
      avalon.scan(document.body);
   });
});