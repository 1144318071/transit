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
            vmCarHall.getCityCar();
        })
    }
    else {
        alert('获取当前定位失败');
    }
},{enableHighAccuracy: true});

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
            city:'',
            token:'',
            newsList:[],
            brandsList:[],
            hotCarList:[],
            agentList:[],
            attentionList:[],
            onLoad:function(){
                var token = localStorage.getItem('token');
                vmCarHall.token = token;
                vmCarHall.getNewsList();
                vmCarHall.getPopularBrands();
                vmCarHall.getAttention();
            },
            getNewsList:function(){
                vmCarHall.newsData._token_ = vmCarHall.token;
                getAjax(API.URL_GET_NEWS, 'get', vmCarHall.newsData).then(function (res) {
                    // for(var i=0;i<res.result.length;i++){
                    //     res.result[i].images = getApiHost + res.result[i].images;
                    // }
                    vmCarHall.newsList = res.result;
                });
                vmCarHall.getHotCar();

            },
            getPage:function(el){
                var src = el.currentTarget.dataset.src;
                location.href = src;
            },
            //获取热门品牌
            getPopularBrands:function(){
                getAjax(API.URL_GET_POPULARBRANDS,'get', {'_token_':vmCarHall.newsData._token_}).then(function (res) {
                    // console.log('热门品牌',res.result);
                    for(var i=0;i<res.result.length;i++){
                        res.result[i].logo = getApiHost + res.result[i].logo;
                    }
                    vmCarHall.brandsList = res.result;
                });
            },
            //热门车型数据
            getHotCar:function(){
                getAjax(API.URL_GET_HOTCAR,'get',{'_token_':vmCarHall.token}).then(function(res){
                    for(var i=0;i<res.result.length;i++){
                        if(!res.result[i].appearance_pic==''){
                            res.result[i].appearance_pic = getApiHost + res.result[i].appearance_pic;
                            // vmCarHall.hotCarList.push(res.result[i])
                        }
                    }
                    vmCarHall.hotCarList = res.result;

                });
            },
            //关注度排行
            getAttention:function(){
                getAjax(API.URL_GET_ATTENTION,'get',{'_token_':vmCarHall.token}).then(function(res){
                        vmCarHall.attentionList = res.result;
                        console.log('关注度排行',res)
                });
                vmCarHall.getQualityAgent();
            },
            //优质经销商
            getQualityAgent:function(){
                getAjax(API.URL_GET_QUALITYAGENT,'get',{'_token_':vmCarHall.token}).then(function(res){
                    for(var j=0;j<res.result.length;j++){
                      res.result[j].shop_logo = getApiHost + res.result[j].shop_logo;
                    }
                    vmCarHall.agentList = res.result;
                });
            },
            getCityCar:function(){
                var data = {
                    '_token_' :vmCarHall.token,
                    'city':'',
                    //10：载货车 20：牵引车  30：自卸车 40：新能源  50：轻卡  60：挂车
                    'car_type':'20'
                };
                var cityCode = getCode(vmCarHall.city);
                data.city = cityCode;
                getAjax(API.URL_GET_CITYCAR,'get',data).then(function(res){
                    console.log(res);
                });
            }
        });
        vmCarHall.onLoad();
        avalon.scan(document.body);
    });
});