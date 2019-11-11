$('.tab-title li').click(function () {
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $('.tab-content .tab-detail').hide();
    $('.tab-content .tab-detail').eq($(this).index()).show();
});

$('.img_carSeries').hover(function(){
    $(this).find('.info_carSeries').show();
},function(){
    $(this).find('.info_carSeries').hide();
});
$('.img_carSeries_small').hover(function(){
  $(this).find('.info_carSeries_small').show();
},function(){
  $(this).find('.info_carSeries_small').hide();
});
//百度地址定位
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point,14);
//浏览器定位
/*
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
        $('#lat').val(r.point.lat);//获取到的纬度
        $('#lon').val(r.point.lng);//获取到的经度

        var gc = new BMap.Geocoder();
        var pointAdd = new BMap.Point(r.point.lng, r.point.lat);
        gc.getLocation(pointAdd, function(rs){
            // 百度地图解析城市名
            $('#pro_num').html(rs.addressComponents.city);
            //或者其他信息
            console.log(rs);
            vmCarHall.city = rs.addressComponents.city;
            // vmCarHall.getCityCar();
        })
    }
    else {
        console.log('获取当前定位失败');
    }
},{enableHighAccuracy: true});
*/

$(function(){
    avalon.ready(function(){
        window.vmCarHall = avalon.define({
            $id : 'root',
            newsData:{
                '_token_': '',
                'page': '1',
                'limit': '14',
                'type': '20',
                'news_type': ''
            },
            cityCarType:{
                '_token_' :'',
                'city':'',
                //10：载货车 20：牵引车  30：自卸车 40：新能源  50：轻卡  60：挂车
                'car_type':'50'
            },
            city:'成都市',
            token:'',
            newsList:[],
            brandsList:[],
            hotCarList:[],
            agentList:[],
            attentionList:[],
            carTypeList:[],
            ZHList:[],
            QYList:[],
            ZXList:[],
            XNYList:[],
            QKList:[],
            GCList:[],
            carTypeNews:[],
            onLoad:function(){
                var token = localStorage.getItem('token');
                vmCarHall.token = token;
                vmCarHall.getNewsList();
                vmCarHall.getPopularBrands();
                vmCarHall.getAttention();
                vmCarHall.getCityCarList();
            },
            getNewsList:function(){
                vmCarHall.newsData._token_ = vmCarHall.token;
                getAjax(API.URL_GET_NEWS, 'get', vmCarHall.newsData).then(function (res) {
                    if(res.code == 200){
                        // for(var i=0;i<res.result.length;i++){
                        //     res.result[i].images = getApiHost + res.result[i].images;
                        // }
                        vmCarHall.newsList = res.result;
                        vmCarHall.getHotCar();
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            getPage:function(el){
                var src = el.currentTarget.dataset.src;
                location.href = src;
            },
            //获取热门品牌
            getPopularBrands:function(){
                getAjax(API.URL_GET_POPULARBRANDS,'get', {'_token_':vmCarHall.newsData._token_}).then(function (res) {
                    if(res.code == 200){
                        // console.log('热门品牌',res.result);
                        for(var i=0;i<res.result.length;i++){
                            res.result[i].logo = getApiHost + res.result[i].logo;
                        }
                        vmCarHall.brandsList = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            //热门车型数据
            getHotCar:function(){
                getAjax(API.URL_GET_HOTCAR,'get',{'_token_':vmCarHall.token}).then(function(res){
                    if(res.code == 200){
                        for(var i=0;i<res.result.length;i++){
                            if(!res.result[i].appearance_pic==''){
                                res.result[i].appearance_pic = getApiHost + res.result[i].appearance_pic;
                                // vmCarHall.hotCarList.push(res.result[i])
                            }
                        }
                        vmCarHall.hotCarList = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            //关注度排行
            getAttention:function(){
                getAjax(API.URL_GET_ATTENTION,'get',{'_token_':vmCarHall.token}).then(function(res){
                    if(res.code == 200){
                        vmCarHall.attentionList = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
                vmCarHall.getQualityAgent();
            },
            //优质经销商
            getQualityAgent:function(){
                getAjax(API.URL_GET_QUALITYAGENT,'get',{'_token_':vmCarHall.token}).then(function(res){
                    if(res.code == 200){
                        for(var j=0;j<res.result.length;j++){
                            res.result[j].shop_logo = getApiHost + res.result[j].shop_logo;
                            res.result[j].province = getProvinceName(res.result[j].province);
                            res.result[j].city = getCityName(res.result[j].city);
                            res.result[j].area = getAreaName(res.result[j].area)
                        }
                        vmCarHall.agentList = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            getCityCarList:function(){
                vmCarHall.cityCarType._token_ = vmCarHall.token;
                var cityCode = getCode(vmCarHall.city);
                vmCarHall.cityCarType.city = cityCode;
                getAjax(API.URL_GET_CITYCAR,'get',vmCarHall.cityCarType).then(function(res){
                    if(res.code == 200){
                        var type = vmCarHall.cityCarType.car_type;
                        vmCarHall.carTypeNews = res.result.news;
                        switch(type){
                            //10：载货车 20：牵引车  30：自卸车 40：新能源  50：轻卡  60：挂车
                            case '10':
                                vmCarHall.ZHList = res.result.list;
                            break;
                            case '20':
                                vmCarHall.QYList = res.result.list;
                            break;
                            case '30':
                                vmCarHall.ZXList = res.result.list;
                            break;
                            case '40':
                                vmCarHall.XNYList = res.result.list;
                            break;
                            case '50':
                                vmCarHall.QKList = res.result.list;
                            break;
                            case '60':
                                vmCarHall.GCList = res.result.list;
                            break;
                            default:
                            break;
                        };
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            //10：载货车 20：牵引车  30：自卸车 40：新能源  50：轻卡  60：挂车
            getQKList:function(){
                vmCarHall.cityCarType.car_type = '50';
                vmCarHall.getCityCarList();
            },
            getQYList:function(){
                vmCarHall.cityCarType.car_type = '20';
                vmCarHall.getCityCarList();
            },
            getZXList:function(){
                vmCarHall.cityCarType.car_type = '30';
                vmCarHall.getCityCarList();
            },
            getXNYList:function(){
                vmCarHall.cityCarType.car_type = '40';
                vmCarHall.getCityCarList();
            },
            getZHList:function(){
                vmCarHall.cityCarType.car_type = '10';
                vmCarHall.getCityCarList();
            },
            getGCList:function(){
                vmCarHall.cityCarType.car_type = '60';
                vmCarHall.getCityCarList();
            },
            /*交互效果*/
            setActive:function(el){
                $('#'+el).find('.showInfo').show().siblings().find('.showInfo').hide();
            },
            removeActive:function(el){
                $('#'+el).find('.showInfo').hide();
            }
        });
        vmCarHall.onLoad();
        avalon.scan(document.body);
    });
});