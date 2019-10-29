$(function(){
    avalon.ready(function(){
        window.vmOrderDetail = avalon.define({
            $id:'root',
            postData:{
                '_token_':'',
                'order_id':''
            },
            goodsInfo:{},
            onLoad:function(){
                vmOrderDetail.getGoodsDetail();
            },
            getGoodsDetail:function(){
                vmOrderDetail.postData._token_  = localStorage.getItem('token');
                vmOrderDetail.postData.order_id = localStorage.getItem('goods_checkId');
                getAjax(API.URL_GET_GOODSINFO,'get',vmOrderDetail.postData).then(function(res){
                    if(res.code == 200){
                        var result = res.result;
                        var imgArr = result.goods_images.split(',');
                        for(var i in imgArr){
                            imgArr[i] = getApiHost + imgArr[i];
                        }
                        result.goods_images = imgArr;
                        result.start_address.province = getProvinceName(result.start_address.province);
                        result.start_address.city = getCityName(result.start_address.city);
                        result.start_address.area = getAreaName(result.start_address.area);
                        result.end_address.province = getProvinceName(result.end_address.province);
                        result.end_address.city = getCityName(result.end_address.city);
                        result.end_address.area = getAreaName(result.end_address.area);
                        vmOrderDetail.goodsInfo = result;
                        console.log(result)
                    }
                });
            }
        });
        vmOrderDetail.onLoad();
        avalon.scan(document.body);
    });
});
