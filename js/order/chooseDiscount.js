// 公共方法
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) < 0) {
        if(loginCode.indexOf(code)>=0){
            alertMsg(res.message,2);
            window.location.href='../../login.html';
        }else{
            alertMsg(res.message,2);
        }
    }
}
$(function(){
    avalon.ready(function(){
        window.vmDiscount = avalon.define({
            $id :'discount',
            couponList:[],
            onLoad:function () {
                vmDiscount.getCouponList();
            },
            cancel:function(){
                localStorage.setItem('coupon_id','');
                localStorage.setItem('less','');
                parent.layer.close(parent.layer.index);
            },
            selectCoupon:function(){
                var id = localStorage.getItem('coupon_id');
                if(id !="" && id !=null){
                    $('#discount_'+id).find('.selected').show();
                }
            },
            confirm:function(){
                parent.layer.close(parent.layer.index);
                /*localStorage.setItem('coupon_id',id);
                localStorage.setItem('less',less);
                var id = localStorage.getItem('coupon_id');
                console.log(id)*/
            },
            //选择优惠券
            chooseCoupon:function(el,id,less){
                var flag = $('#discount_'+id).find('.selected').is(':hidden');
                if(!flag){
                    $('#discount_'+id).find('.selected').hide();
                }else{
                    $('#discount_'+id).find('.selected').show();
                }
               /* $('#'+el).find('.selected').show();
                $('#'+el).siblings().find('.selected').hide();*/
                localStorage.setItem('coupon_id',id);
                localStorage.setItem('less',less);
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
                        vmDiscount.selectCoupon();
                    }else{
                        checkToken(res);
                    }
                });
            }
        });
        vmDiscount.onLoad();
        avalon.scan(document.body);
    });
});
