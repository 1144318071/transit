layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel,
        form = layui.form;
    //图片轮播
    carousel.render({
        elem: '#test10',
        width: '100%',
        height: '460px',
        interval: 3000
    });
    //监听开关
    form.on('switch(autoplay)', function () {
        ins3.reload({
            autoplay: this.checked
        });
    });
});
$(function(){
    avalon.ready(function(){
        window.vmIndex = avalon.define({
            $id : 'home',
            newsData:{
                '_token_': '',
                'page': '1',
                'limit': '15',
                'type': '20',
                'news_type': ''
            },
            newsList:[],
            ZCFGList:[],
            HQDGList:[],
            HYZXList:[],
            enterpriseList:[],
            bannerImg:[],
            onLoad:function(){
                vmIndex.getNewsList();
                vmIndex.getZCFGList();
                vmIndex.getHQDGList();
                vmIndex.getHYZXList();
                vmIndex.getEnterpriseList();
                vmIndex.getBanners();
            },
            //获取新闻列表
            getNewsList:function(){
                vmIndex.newsData._token_ = localStorage.getItem('token');
                getAjax(API.URL_GET_NEWS, 'get', vmIndex.newsData).then(function (res) {
                    // for(var i=0;i<res.result.length;i++){
                    //     res.result[i].images = getApiHost + res.result[i].images;
                    // }
                    vmIndex.newsList = res.result;
                    // console.log(vmIndex.newsList);
                });
            },
            //分类的新闻列表
            getTypeList:function(type){
                vmIndex.newsData.limit = '9';
                getAjax(API.URL_GET_NEWS,'get',vmIndex.newsData).then(function(res){
                   switch (type) {
                       case '10':
                           vmIndex.ZCFGList = res.result;
                           break;
                       case '20':
                           vmIndex.HQDGList = res.result;
                           break;
                       case '30':
                           vmIndex.HYZXList = res.result;
                           break;
                       default:
                           break;
                   }
                });
            },
            getZCFGList:function(){
                //10：政策法规  20：行情导购  30：行业资讯
                vmIndex.newsData.news_type = '10';
                vmIndex.getTypeList('10');
            },
            getHQDGList:function () {
                vmIndex.newsData.news_type = '20';
                vmIndex.getTypeList('20');
            },
            getHYZXList:function () {
                vmIndex.newsData.news_type = '30';
                vmIndex.getTypeList('30');
            },
            //获取合作企业列表
            getEnterpriseList:function(){
                var enterData = {
                    '_token_':vmIndex.newsData._token_,
                    'listRows':'12'
                }
                getAjax(API.URL_GET_ENTERPRISELIST,'get',enterData).then(function(res){
                    for(var i in res.result){
                        res.result[i].logo = getApiHost + res.result[i].logo;
                    }
                    vmIndex.enterpriseList = res.result;
                    // console.log('合作企业',vmIndex.enterpriseList);
                });
            },
            changeShow:function(el){
                if(el === 173){
                    $('.img_carSeries:first-child').find('.info_carSeries').show(500);
                    $('.img_carSeries:last-child').find('.info_carSeries').hide(500);

                }else{
                    $('.img_carSeries:first-child').find('.info_carSeries').hide(500);
                    $('.img_carSeries:last-child').find('.info_carSeries').show(500);
                }
            },
            //获取banner图片
            getBanners:function(){
                var token = localStorage.getItem('token');
                getAjax(API.URL_GET_BANNERLIST,'get',{'_token_':token,'list':'5'}).then(function(res){
                    for(var i=0;i<res.result.length;i++){
                        res.result[i].banner_img = getApiHost + res.result[i].banner_img;
                    }
                    vmIndex.bannerImg = res.result;
                    console.log(vmIndex.bannerImg)
                })
            }
        });
        vmIndex.onLoad();
        avalon.scan(document.body)
    });
});
// 发布订单系列的内容
$('.hLine').hide();
// $('.itemBox').hover(function(){
//     $(this).addClass('active');
//     $(this).find('.hLine').show();
//     $(this).find('img').css({'width':'153px','height':'153px'});
// },function(){
//     $(this).removeClass('active');
//     $(this).find('.hLine').hide();
//     $(this).find('img').css({'width':'175px','height':'175px'})
// });
