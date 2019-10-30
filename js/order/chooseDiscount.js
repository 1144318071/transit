$(function(){
    avalon.ready(function(){
        window.vmDiscount = avalon.define({
            $id :'root',
            couponList:[],
            onLoad:function () {
                vmDiscount.getCouponList();
            },
            cancel:function(){
                localStorage.setItem('coupon_id','');
                parent.layer.close(parent.layer.index);
            },
            confirm:function(){
                parent.layer.close(parent.layer.index);
            },
            //选择优惠券
            chooseCoupon:function(el,id){
                var flag = $('#'+el).find('.selected').is(':hidden');
                if(!flag){
                    $('#'+el).find('.selected').hide();
                }else{
                    $('#'+el).find('.selected').show();
                }
                $('#'+el).find('.selected').show();
                $('#'+el).siblings().find('.selected').hide();
                localStorage.setItem('coupon_id',id);
            },
            getCouponList:function () {
                var token = localStorage.getItem('token');
                getAjax(API.URL_GET_COUPONLIST,'get',{'_token_':token}).then(function(res){
                    if(res.code == 200){
                        var allMoney = localStorage.getItem('orderAllMoney');
                        for(var i in res.result){
                            res.result[i].allMoney = allMoney
                        }
                        vmDiscount.couponList = res.result;
                    }
                });
            }
        });
        vmDiscount.onLoad();
        avalon.scan(document.body);
    });
});