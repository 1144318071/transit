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
                vmIndex.getToken();
            },
            getToken:function(){
                $.ajax({
                    url: API.URL_POST_SETTOKEN,
                    type: 'post',
                    dataType: 'json',
                    async: true,
                    data: { version: '2.0.1', author: '丶Lee', email: '1144318071@qq.com', date: getNowFormatDate},
                    xhrFields: {
                        withCredentials: true
                    },
                    success:function(res){
                        if(res.code == 200){
                            localStorage.setItem('token',res.result.token);
                            vmIndex.getBanners();
                        }
                    }
                });
            },
            //获取新闻列表
            getNewsList:function(){
                vmIndex.newsData._token_ = localStorage.getItem('token');
                getAjax(API.URL_GET_NEWS, 'get', vmIndex.newsData).then(function (res) {
                    if(res.code == 200){
                        /*图片加域名*/
                        // for(var i=0;i<res.result.length;i++){
                        //     res.result[i].images = getApiHost + res.result[i].images;
                        // }
                        vmIndex.newsList = res.result;
                        vmIndex.getZCFGList();
                        vmIndex.getHQDGList();
                        vmIndex.getHYZXList();
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
                    }
                });
            },
            //分类的新闻列表
            getTypeList:function(type){
                vmIndex.newsData.limit = '9';
                getAjax(API.URL_GET_NEWS,'get',vmIndex.newsData).then(function(res){
                    if(res.code == 200){
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
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
                    }
                });
            },
            getZCFGList:function(){
                //10：政策法规  20：行情导购  30：行业资讯
                vmIndex.newsData.news_type = '10';
                vmIndex.getTypeList('10');
                vmIndex.getEnterpriseList();
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
                    if(res.code == 200){
                        for(var i in res.result){
                            res.result[i].logo = getApiHost + res.result[i].logo;
                        }
                        vmIndex.enterpriseList = res.result;
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
                    }
                });
            },
            changeShow:function(el){
                $('#'+el).find('.info_carSeries').show().siblings().find('.info_carSeries').hide();
            },
            hideShow:function(el){
                $('#'+el).find('.info_carSeries').hide();
            },
            //获取banner图片
            getBanners:function(){
                var token = localStorage.getItem('token');
                getAjax(API.URL_GET_BANNERLIST,'get',{'_token_':token,'list':'5','type':'50'}).then(function(res){
                    if(res.code == 200){
                        for(var i=0;i<res.result.length;i++){
                            res.result[i].banner_img = getApiHost + res.result[i].banner_img;
                        }
                        vmIndex.bannerImg = res.result;
                        vmIndex.getNewsList();
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code) >= 0){
                            getToken();
                            vmIndex.onLoad();
                        }else{
                            let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                            let code =  res.code;
                            if(tokenCode.indexOf(code)<0){
                                alertMsg(res.message,2);
                            }
                        }
                    }

                })
            }
        });
        vmIndex.onLoad();
        avalon.scan(document.body);
    });
});
// 发布订单系列的内容
$('.hLine').hide();
$('.img_carSeries').hover(function(){
    $(this).find('.info_carSeries').show().siblings().hide();
},function(){
    $(this).find('.info_carSeries').hide();
});
