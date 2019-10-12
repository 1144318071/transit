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
                    for(var i=0;i<res.result.length;i++){
                       res.result[i][0].logo = getApiHost + res.result[i][0].logo;
                    }
                    vmAllBrands.brandSearchList = res.result;
                    for(var i=0;i<res.result.length;i++){
                        console.log(res.result[i]);
                        for(var j=0;j<res.result[i].length;j++){
                            console.log(res.result[i][j].series)
                        }
                    }
                });
            },
        });
        vmAllBrands.onLoad();
        avalon.scan(document.body);
    });
});