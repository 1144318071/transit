 $('.tabMenu li').click(function () {
     $(this).addClass('tab_this').siblings().removeClass('tab_this');
     $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
 });
 var province = [];

 function getProvince() {
     for (var i in Area.provinces.province) {
         province.push('<a href="javascript:setCity(' + Area.provinces.province[i].ssqid + ')">' + Area.provinces.province[i].ssqname + '</a>');
     }
     return province.join(' ');
 }
 var city = [];
 function getCity(id) {
     for (var k in Area.provinces.province) {
         if (Area.provinces.province[k].ssqid == id) {
             for (var i in Area.provinces.province[k].cities.city) {
                 city.push('<a href="javascript:getAgentList(' + Area.provinces.province[k].cities.city[i].ssqid +')">' + Area.provinces.province[k].cities.city[i].ssqname + '</a>');
             }
         }
     }
     return city.join(' ');
 }
 function setCity(id) {
     city = [];
     document.getElementById('city').innerHTML = getCity(id);
     if(id == 1){
         vmBrandDetail.agentData.province='',
         vmBrandDetail.agentData.city='';
         getAgentList();
     }
 }
 function getAgentList(res) {
     vmBrandDetail.agentData.city = res;
     vmBrandDetail.agentList = [];
     getAjax(API.URL_GET_QUALITYAGENT,'get',vmBrandDetail.agentData).then(function(res){
         if(res.code == 200){
             vmBrandDetail.agentList = res.result;
             for(var i=0;i<res.result.length;i++){
                 var provinceCode = res.result[i].province;
                 var cityCode = res.result[i].city;
                 var areaCode = res.result[i].area;
                 var p = getProvinceName(provinceCode)
                 var c= getCityName(cityCode);
                 var a = getAreaName(areaCode);
                 res.result[i].province = p;
                 res.result[i].city = c;
                 res.result[i].area = a;
                 res.result[i].shop_logo = getApiHost + res.result[i].shop_logo;
             }
         }else{
             alertMsg(res.message,2)
         }

     });
 }
 document.getElementById('province').innerHTML = getProvince();
$('#province a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});
    $("#city").delegate("a", "click", function () {
    $(this).addClass('active').siblings().removeClass('active')
});
$(function(){
    avalon.ready(function(){
        window.vmBrandDetail = avalon.define({
            $id : 'root',
            queryData:{},
            brandInfo:{},
            carDetail:[],
            carType:[],
            agentList:[],
            agentData:{
                '_token_':'',
                'brands_id':'',
                'province':'',
                'city':''
            },
            onLoad:function(){
                vmBrandDetail.getNewsId();
                vmBrandDetail.getBrandInfo();
            },
            getNewsId:function(){
                var url = window.location.href;
                var urlJson = GetRequest(url);
                vmBrandDetail.queryData = urlJson;
                var token = localStorage.getItem('token');
                vmBrandDetail.queryData.token = token;
                vmBrandDetail.agentData._token_ = token;
                vmBrandDetail.agentData.brands_id = urlJson.id;
            },
            getBrandInfo:function(){
                var postData = {
                    '_token_':vmBrandDetail.queryData.token,
                    'brands_id':vmBrandDetail.queryData.id
                }
                getAjax(API.URL_GET_BRANDINFO,'get',postData).then(function (res) {
                    if(res.code == 200){
                        res.result.info.logo = getApiHost + res.result.info.logo;
                        vmBrandDetail.brandInfo = res.result.info;
                        vmBrandDetail.carDetail = res.result.data;
                        for(var i=0;i<res.result.car_type.length;i++){
                            if(res.result.car_type[i].appearance_pic !=''){
                                res.result.car_type[i].appearance_pic = getApiHost + res.result.car_type[i].appearance_pic;
                            }
                        }
                        vmBrandDetail.carType = res.result.car_type;
                        var data = res.result.data;
                        for(var j=0;j<data.length;j++){
                            if(data[j].image !=''){
                                data[j].image = getApiHost + data[j].image
                            }
                        }
                    }else{
                        alertMsg(res.message,2);
                    }
                });
                //vmBrandDetail.getAgentList();
            },
            showEnergy:function(){
                $('.energyType').show();
            },
            hideEnergy:function(){
                $('.energyType').hide();
            },
            //获取经销商
            getAgentList:function(){
                getAjax(API.URL_GET_QUALITYAGENT,'get',{'_token_':vmBrandDetail.queryData.token,'brands_id':vmBrandDetail.queryData.id}).then(function(res){
                    console.log(res);
                });
            }
        });
        vmBrandDetail.onLoad();
        $('#province>a:first-child').addClass('active');
        setCity(1);
        avalon.scan(document.body);
    });
});
