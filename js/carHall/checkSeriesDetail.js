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
          appearance_count:'0',
          interior_count:'0',
          chassis_count:'0',
          tops_count:'0',
          other_count:'0',
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
                     /*外观*/
                     var appearance_pic = [];
                     /*内饰*/
                     var interior_pic=[];
                     /*底盘*/
                     var chassis_pic=[];
                     /*上装*/
                     var tops_pic=[];
                     /*其他*/
                     var other_pic = [];
                     if(res.result.appearance_pic!=''){
                         appearance_pic = res.result.appearance_pic.split(',');
                     }
                     if(res.result.interior_pic!=''){
                         interior_pic = res.result.interior_pic.split(',');
                     }
                     if(res.result.chassis_pic!=''){
                         chassis_pic = res.result.chassis_pic.split(',');
                     }
                     if(res.result.tops_pic!=''){
                         tops_pic = res.result.tops_pic.split(',');
                     }
                     if(res.result.other_pic!=''){
                         other_pic = res.result.other_pic.split(',');
                     }
                     for(var i in appearance_pic){
                         var img1 = getApiHost + appearance_pic[i];
                         vmCheckSeriesDetail.appearance_pic.push(img1);
                     };
                     for(var j in interior_pic){
                         var img2 = getApiHost + interior_pic[j];
                         vmCheckSeriesDetail.interior_pic.push(img2);
                     };
                     for(var k in chassis_pic){
                         var img3 = getApiHost + chassis_pic[k];
                         vmCheckSeriesDetail.chassis_pic.push(img3);
                     };
                     for(var m in tops_pic){
                         var img4 = getApiHost + tops_pic[m];
                         vmCheckSeriesDetail.tops_pic.push(img4);
                     };
                     for(var n in other_pic){
                         var img5 = getApiHost + other_pic[n];
                         vmCheckSeriesDetail.other_pic.push(img5);
                     };
                     vmCheckSeriesDetail.appearance_count = vmCheckSeriesDetail.appearance_pic.length;
                     vmCheckSeriesDetail.interior_count = vmCheckSeriesDetail.interior_pic.length;
                     vmCheckSeriesDetail.chassis_count = vmCheckSeriesDetail.chassis_pic.length;
                     vmCheckSeriesDetail.tops_count = vmCheckSeriesDetail.tops_pic.length;
                     vmCheckSeriesDetail.other_count = vmCheckSeriesDetail.other_pic.length;
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