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
            newsList:[],
            brandsList:[],
            onLoad:function(){
                vmCarHall.getNewsList();
                vmCarHall.getPopularBrands();
            },
            getNewsList:function(){
                var token = localStorage.getItem('token');
                vmCarHall.newsData._token_ = token;
                getAjax(API.URL_GET_NEWS, 'get', vmCarHall.newsData).then(function (res) {
                    // for(var i=0;i<res.result.length;i++){
                    //     res.result[i].images = getApiHost + res.result[i].images;
                    // }
                    vmCarHall.newsList = res.result;
                    // console.log('新闻列表',vmCarHall.newsList);
                });
            },
            getPage:function(el){
                var src = el.currentTarget.dataset.src;
                location.href = src;
            },
            //获取热门品牌
            getPopularBrands:function(){
                getAjax(API.URL_GET_POPULARBRANDS,'get', {'_token_':vmCarHall.newsData._token_}).then(function (res) {
                    console.log('热门品牌',res.result);
                    for(var i=0;i<res.result.length;i++){
                        res.result[i].logo = getApiHost + res.result[i].logo;
                    }
                    vmCarHall.brandsList = res.result;
                });
            },

        });
        vmCarHall.onLoad();
        avalon.scan(document.body);
    });
});