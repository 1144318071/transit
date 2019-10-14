$('.menuGroup .groupTitle').on('click', function() {
    $(this).siblings().show().parent().siblings().children('div').hide();
    $(this).addClass('titleActive').parent().siblings().find('.groupTitle').removeClass('titleActive');
    var index = $(this).parent().index();
    $('.allKinds .groupContent').eq(index).show().siblings().hide();
});
$(function(){
    avalon.ready(function(){
        window.vmAllBrands = avalon.define({
            $id : 'root',
            keyWordList:[],
            _token_ : '',
            keyword:'',
            brandSearchList:[],
            onLoad:function () {
                vmAllBrands.getKeyword();
            },
            //获取首字母
            getKeyword : function(){
                var token = localStorage.getItem('token');
                vmAllBrands._token_ = token;
                getAjax(API.URL_GET_KEYWORD,'get',{'_token_':token}).then(function (res) {
                    vmAllBrands.keyWordList = res.result;
                    vmAllBrands.keyword = vmAllBrands.keyWordList[0].keyword;
                    vmAllBrands.getBrandsList();
                });
            },
            //品牌筛选
            getBrandsList:function(){
                console.log(vmAllBrands.keyword)
                getAjax(API.URL_GET_BRANDSSEARCH,'get',{'_token_':vmAllBrands._token_,'keyword':''}).then(function (res) {
                    for(var i=0;i<res.result.data.length;i++){
                       res.result.data[i][0].logo = getApiHost + res.result.data[i][0].logo;
                    }
                    vmAllBrands.brandSearchList = res.result.data;
                });
            },
        });
        vmAllBrands.onLoad();
        avalon.scan(document.body);
    });
});