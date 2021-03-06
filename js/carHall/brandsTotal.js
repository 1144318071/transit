$('.menuGroup .groupTitle').on('click', function() {
    $(this).siblings().show().parent().siblings().children('div').hide();
    $(this).addClass('titleActive').parent().siblings().find('.groupTitle').removeClass('titleActive');
    var index = $(this).parent().index();
    $('.allKinds .groupContent').eq(index).show().siblings().hide();
});
$(".letterSelect").delegate("span","click",function(){
    $(this).addClass('active').siblings().removeClass('active');
});
$('.kindsContent>div span').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $(this).parent().siblings().find('span').removeClass('active');
});
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
        window.vmAllBrands = avalon.define({
            $id : 'root',
            keyWordList:[],
            _token_ : '',
            keyword:'',
            brandSearchList:[],
            onLoad:function () {
                vmAllBrands.getKeyword();
            },
            typeData:{
                '_token_':'',
                'type' : '',
                'car_type':''
            },
            typeList:[],
            //获取首字母
            getKeyword : function(){
                let token = localStorage.getItem('token');
                vmAllBrands._token_ = token;
                vmAllBrands.typeData._token_ = token;
                getAjax(API.URL_GET_KEYWORD,'get',{'_token_':token}).then(function (res) {
                    if(res.code == 200){
                        vmAllBrands.keyWordList = res.result;
                        vmAllBrands.getKeyWordList('');
                    }else{
                        checkToken(res);
                    }
                });
            },
            //品牌筛选
            /*getBrandsList:function(){
                getAjax(API.URL_GET_BRANDSSEARCH,'get',{'_token_':vmAllBrands._token_,'keyword':''}).then(function (res) {
                    for(var i=0;i<res.result.data.length;i++){
                       res.result.data[i][0].logo = getApiHost + res.result.data[i][0].logo;
                    }
                    vmAllBrands.brandSearchList = res.result.data;
                    console.log(vmAllBrands.brandSearchList)
                });
            },*/
            getKeyWordList:function(el){
                $("#brands").html('');
                getAjax(API.URL_GET_BRANDSSEARCH,'get',{'_token_':vmAllBrands._token_,'keyword':el}).then(function (res) {
                    if(res.code == 200) {
                        for (var i = 0; i < res.result.data.length; i++) {
                            res.result.data[i][0].logo = getApiHost + res.result.data[i][0].logo;
                        }
                        vmAllBrands.brandSearchList = res.result.data;
                        var result = res.result.data;
                        var loopItem = '';
                        $(result).each(function (index, el) {
                            $(el).each(function (i,item) {
                                loopItem +=
                                    "<li>\n" +
                                    "<a href='./carSeriesDetail.html?car_ty=" + item.car_ty + "&id=" + item.manager_id + "&series=" + item.series + "'>" + item.series + "</a>\n" +
                                    "</li>\n";
                            })
                            htmlContent = "<div class='row groupItems'>\n" +
                                "                            <div class='col-md-3 col-sm-3'>\n" +
                                "                                <ul>\n" +
                                "                                    <li><a href=\"./brandsDetail.html?id=" + el[0]['manager_id'] + "\"><img src=\"" + el[0]['logo'] + "\" width=\"192\" height=\"120\" /></a></li>\n" +
                                "                                    <li><a href=\"./brandsDetail.html?id=" + el[0]['manager_id'] + "\">" + el[0]['nick_name'] + "</a></li>\n" +
                                "                                </ul>\n" +
                                "                            </div>\n" +
                                "                            <div class='col-md-9 col-sm-9'>\n" +
                                "                                <ul>\n" +
                                "\n" + loopItem +
                                "                                </ul>\n" +
                                "                            </div>\n" +
                                "                        </div>";
                            $("#brands").append(htmlContent);
                        });
                    }else{
                        checkToken(res);
                    }
                });
            },
            //类型筛选
            getTypeList:function () {
                $("#test").html('');
                getAjax(API.URL_GET_TYPESEARCH,'get',vmAllBrands.typeData).then(function(res){
                    if(res.code == 200){
                        vmAllBrands.typeList = res.result;
                        let seriesList = vmAllBrands.typeList;
                        var str = '';
                        $.each(seriesList,function (index,elt) {
                            str = '';
                            $.each(elt,function (el,item) {
                                str +=
                                    "<li>\n" +
                                    "<a href='./carSeriesDetail.html?car_ty="+item.car_ty+"&id="+item.manager_id+"&series="+item.series+"'>"+item.series+"</a>\n" +
                                    "</li>\n" ;
                            });
                            info = "<div class=\"groupItem\">\n" +
                                "<ul class='barTitle clearfix'>\n" +
                                "<li class='titleLine'></li>\n" +
                                "<li>"+elt[0]['type_name']+"</li>\n" +
                                "</ul>\n" +
                                "<div class='groupDetail'>" +
                                "<ul class='clearfix'>\n"+str+"</ul>" +
                                "</div>\n" +
                                "</div>";
                            $("#test").append(info);
                        });
                    }else{
                        checkToken(res);
                    }
                });
            },
            carType:function(type,carType){
                vmAllBrands.typeData.type = type;
                vmAllBrands.typeData.car_type = carType;
                vmAllBrands.getTypeList(type,carType);
            }
        });
        vmAllBrands.onLoad();
        avalon.scan(document.body);
    });
});
