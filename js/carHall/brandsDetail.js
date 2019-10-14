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
 // console.log(Area.provinces.province)
 var city = [];
 function getCity(id) {
     for (var k in Area.provinces.province) {
         if (Area.provinces.province[k].ssqid == id) {
             for (var i in Area.provinces.province[k].cities.city) {
                 city.push('<a href="javascript:;">' + Area.provinces.province[k].cities.city[i].ssqname + '</a>');
             }
         }
     }
     return city.join(' ');
 }
 function setCity(id) {
     city = [];
     document.getElementById('city').innerHTML = getCity(id);
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
            },
            getBrandInfo:function(){
                var postData = {
                    '_token_':vmBrandDetail.queryData.token,
                    'brands_id':vmBrandDetail.queryData.id
                }
                getAjax(API.URL_GET_BRANDINFO,'get',postData).then(function (res) {
                    res.result.info.logo = getApiHost + res.result.info.logo;
                    vmBrandDetail.brandInfo = res.result.info;
                    vmBrandDetail.carDetail = res.result.data[0];
                    for(var i=0;i<res.result.car_type.length;i++){
                        if(!res.result.car_type[i].appearance_pic==''){
                            res.result.car_type[i].appearance_pic = getApiHost + res.result.car_type[i].appearance_pic;
                        }
                    }
                    vmBrandDetail.carType = res.result.car_type;
                    var data = res.result.data[0];
                    for(var j=0;j<data.length;j++){
                        data[j].image = getApiHost + data[j].image
                    }
                    console.log(vmBrandDetail.carDetail)
                });
                vmBrandDetail.getAgentList();
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
        avalon.scan(document.body);
    });
});
