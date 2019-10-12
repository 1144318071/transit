$(function(){
    avalon.ready(function(){
        window.vmNewsDetail = avalon.define({
            $id : 'root',
            postData:{
                '_token_':'',
                'id':'',
                'type':''
            },
            queryData:{},
            newsDetail:{},
            relativeNewsList:[],
            hotNewsList:[],
            onLoad:function(){
                vmNewsDetail.getNewsId();
                vmNewsDetail.getNewsDetail();
                vmNewsDetail.getRelativeNews();
                vmNewsDetail.getHostNews();
            },
            getNewsId:function(){
                var url = window.location.href;
                var urlJson = GetRequest(url);
                vmNewsDetail.queryData = GetRequest(url);
                vmNewsDetail.postData.id = urlJson.id;
                vmNewsDetail.postData.type = urlJson.type;
            },
            //获取新闻详情
            getNewsDetail:function(){
                var token = localStorage.getItem('token');
                vmNewsDetail.postData._token_ = token;
                getAjax(API.URL_GET_NEWSINFO,'get',vmNewsDetail.postData).then(function(res){
                    vmNewsDetail.newsDetail = res.result;
                    // console.log('新闻详情',vmNewsDetail.newsDetail);
                });
            },
            //获取相关新闻
            getRelativeNews:function(){
                var data = {
                    '_token_': vmNewsDetail.postData._token_,
                    'page':'1',
                    'limit':'17',
                    'type':'20',
                    'news_type': vmNewsDetail.queryData.news_type
                };
                getAjax(API.URL_GET_NEWS,'get',data).then(function(res){
                    // console.log('相关新闻',res);
                    vmNewsDetail.relativeNewsList = res.result;
                });
            },
            //热门新闻
            getHostNews:function(){
                var data = {
                    '_token_' : vmNewsDetail.postData._token_,
                    'page':'1',
                    'limit':'3',
                    'type':'20'
                }
                getAjax(API.URL_GET_HOTNEWS,'get',data).then(function(res){
                    vmNewsDetail.hotNewsList = res.result;
                    console.log('热门新闻',res.result)
                });
            }
        });
        vmNewsDetail.onLoad();
        avalon.scan(document.body);
    });
});
