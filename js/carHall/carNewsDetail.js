// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let code = res.code;
    if (tokenCode.indexOf(code) < 0) {
        alertMsg(res.message,2);
    }
}
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
                    if(res.code == 200){
                        vmNewsDetail.newsDetail = res.result;
                    }else{
                        checkToken(res);
                    }
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
                    if(res.code == 200){
                        vmNewsDetail.relativeNewsList = res.result;
                    }else{
                        checkToken(res);
                    }
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
                    if(res.code == 200){
                        vmNewsDetail.hotNewsList = res.result;
                    }else{
                        checkToken(res);
                    }
                });
            },
        });
        vmNewsDetail.onLoad();
        avalon.scan(document.body);
    });
});
