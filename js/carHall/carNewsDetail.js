$(function(){
    avalon.ready(function(){
        window.vmNewsDetail = avalon.define({
            $id : 'root',
            postData:{
                '_token_':'',
                'id':'',
                'type':'20'
            },
            onLoad:function(){
                vmNewsDetail.getNewsId();
                vmNewsDetail.getNewsDetail();
            },
            getNewsId:function(){
                var url = window.location.href;
                vmNewsDetail.postData.id = GetRequest(url).id;
            },
            getNewsDetail:function(){
                var token = localStorage.getItem('token');
                vmNewsDetail.postData._token_ = token;
                getAjax(API.URL_GET_NEWSINFO,'get',vmNewsDetail.postData).then(function(res){
                    console.log(res);
                });
            }
        });
        vmNewsDetail.onLoad();
        avalon.scan(document.body);
    });
});