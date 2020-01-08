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
         $('.city').hide();
         getAgentList();
     }else{
         $('.city').show();
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
 // 公共方法
function checkToken(res) {
 let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
 let code = res.code;
 if (tokenCode.indexOf(code) >= 0) {
     getToken();
     vmBrandDetail.onLoad();
 }else{
     alertMsg(res.message,2);
 }
}
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
            isShow:{
                type:false,
                type_10:false,
                type_20:false,
                type_30:false
            },
            onLoad:function(){
                vmBrandDetail.getNewsId();
                vmBrandDetail.getBrandInfo();
            },
            getNewsId:function(){
                let url = window.location.href;
                let urlJson = GetRequest(url);
                vmBrandDetail.queryData = urlJson;
                let token = localStorage.getItem('token');
                vmBrandDetail.queryData.token = token;
                vmBrandDetail.agentData._token_ = token;
                vmBrandDetail.agentData.brands_id = urlJson.id;
            },
            getBrandInfo:function(){
                let postData = {
                    '_token_':vmBrandDetail.queryData.token,
                    'brands_id':vmBrandDetail.queryData.id
                };
                getAjax(API.URL_GET_BRANDINFO,'get',postData).then(function (res) {
                    if(res.code == 200){
                        res.result.info.logo = getApiHost + res.result.info.logo;
                        vmBrandDetail.brandInfo = res.result.info;
                        for(let i=0;i<res.result.car_type.length;i++){
                            if(res.result.car_type[i].appearance_pic !=''){
                                res.result.car_type[i].appearance_pic = getApiHost + res.result.car_type[i].appearance_pic;
                            }
                        }
                        vmBrandDetail.carType = res.result.car_type;
                        var data = res.result.data[0];
                        let type_tra = [];
                        let type_new = [];
                        for(var j=0;j<data.length;j++){
                            if(data[j].image){
                                data[j].image = getApiHost + data[j].image
                            };
                            if(data[j].car_ty == 'TRADITIONAL'){
                                type_tra.push(data[j]);
                            }else{
                                type_new.push(data[j]);
                            }
                        };
                        let type=false;
                        if(type_new.length){
                            vmBrandDetail.carDetail.type = true;
                        }else{
                            vmBrandDetail.carDetail.type = false;
                        }
                        let type_10 = [];
                        let type_20=[];
                        let type_30 = [];
                        let isType_10=false;
                        let isType_20=false;
                        let isType_30=false;
                        for(let i=0;i<type_tra.length;i++){
                            if(type_tra[i].type == 10){
                                type_10.push(type_tra[i])
                            }else if(type_tra[i].type == 20){
                                type_20.push(type_tra[i]);
                            }else{
                                type_30.push(type_tra[i]);
                            }
                        }
                        if(type_10.length){
                            isType_10 = true;
                        }else{
                            isType_10 = false;
                        }
                        if(type_20.length){
                            isType_20 = true;
                        }else{
                            isType_20 = false;
                        }
                        if(type_30.length){
                            isType_30 = true;
                        }else{
                            isType_30 = false;
                        }
                        let params = {
                            type:type,
                            type_10:isType_10,
                            type_20:isType_20,
                            type_30:isType_30
                        };
                        vmBrandDetail.isShow = params;
                        vmBrandDetail.carDetail = res.result.data[0];
                    }else{
                        checkToken(res);
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
            },
            //页面跳转
            getPage(type,id){
                window.location.href = './checkSeriesDetail.html?car_ty='+type+'&id='+id;
            },
            getDetail(car_ty,id,series){
                window.location.href = './carSeriesDetail.html?car_ty='+car_ty+'&id='+id+'&series='+series;
            }
        });
        vmBrandDetail.onLoad();
        $('#province>a:first-child').addClass('active');
        setCity(1);
        avalon.scan(document.body);
    });
});
