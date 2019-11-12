$('.personalList li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.personalContent .personalDetail').eq($(this).index()).show().siblings().hide();
});
$('.tabTitle li').click(function(){
   $(this).addClass('active').siblings().removeClass('active');
   $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
});
layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
        layer = layui.layer;
    //自定义样式
    laypage.render({
        elem: 'demo2',
        count: 1000,
        theme: '#f57619'
    });
    laypage.render({
        elem: 'demo3',
        count: 1000,
        theme: '#f57619'
    });
});
// 日历
layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '#test16'
        ,type: 'datetime'
        ,range: '至'
        ,format: 'yyyy-M-d'
    });
});
$(function(){
    avalon.ready(function(){
        window.vmPersonal = avalon.define({
            $id : 'root',
            token:'',
            dateRange:'2019-10-22至2019-11-22',
            onLoad:function(){
                var token = localStorage.getItem('token');
                vmPersonal.token = token;
                vmPersonal.getUserInfo();
                vmPersonal.getBankCardList();
            },
            userInfo:{},
            couponList:[],
            bankCardList:[],
            carList:[],
            changePwd:function(){
                var userType = JSON.parse(localStorage.getItem('userInfo')).type;
                localStorage.setItem('_t', userType);
                location.href = '../../views/login/changePwd.html';
            },
            //添加车辆
            addCar:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['819px', '740px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['addCar.html']
                });
            },
            // 充值
            recharge:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['819px', '493px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['recharge.html']
                });
            },
            // 提现
            applyMoney: function () {
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['819px', '493px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['extract.html']
                });
            },
            //添加银行卡
            addBankCard:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['819px', '493px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['addBankCard.html']
                });
            },
            // 银行卡设为默认
            setDefault:function(el){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['759px', '366px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['setDefault.html']
                });
                localStorage.setItem('bankId',el);
            },
            //银行卡解绑
            unbind:function(el){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['819px', '456px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['bankCardUnbind.html']
                });
                localStorage.setItem('bankId',el);
            },
            //获取个人信息
            getUserInfo:function(){
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_':vmPersonal.token}).then(function(res){
                    if(res.code == 200){
                        res.result.avatar = getApiHost + res.result.avatar;
                        vmPersonal.userInfo = res.result;
                        var userType = res.result.type;
                        switch(userType){
                            case 'PERSONAL':
                                $('.companyInfo').remove();
                                vmPersonal.userInfo.type = '个人';
                                /*车辆列表*/
                                vmPersonal.getCarList();
                                break;
                            case 'MERCHANT':
                                vmPersonal.userInfo.type = '商家';
                                $('.personalList li').eq(1).remove();
                                $('.vehicleManagement').remove();
                                break;
                            case 'LOGISTICS':
                                vmPersonal.userInfo.type = '物流公司';
                                $('.personalList li').eq(1).remove();
                                $('.vehicleManagement').remove();
                                break;
                            case 'PROXY':
                                vmPersonal.userInfo.type = '代理';
                                $('.personalList li').eq(1).hide();
                                $('.vehicleManagement').hide();
                                break;
                        }
                    }else{
                        alertMsg(res.message,2);
                    }
                });
                vmPersonal.getCouponList('10');
            },
            //获取优惠券列表
            getCouponList:function(status){
                getAjax(API.URL_GET_COUPONLIST,'get',{'_token_':vmPersonal.token,'status':status}).then(function(res){
                   if(res.code == 200){
                       vmPersonal.couponList = res.result;
                   }else{
                       alertMsg(res.message,2);
                   }
                });
            },
            //获取银行卡列表
            getBankCardList:function(){
                getAjax(API.URL_GET_BANKLIST,'get',{'_token_':vmPersonal.token}).then(function(res){
                   if(res.code == 200){
                       for(var i in res.result){
                           res.result[i].card_number = stringHidePart(res.result[i].card_number);
                       }
                       vmPersonal.bankCardList = res.result;
                   }else{
                       alertMsg(res.message,2);
                   }
                });
            },
            //获取车辆列表
            getCarList:function(){
                getAjax(API.URL_GET_VEHICLELIST,'get',{'_token_':vmPersonal.token}).then(function(res){
                   if(res.code == 200){
                        var vehicle =[];
                        for(var i=0;i<res.result.length;i++){
                            if(res.result[i].vehicle_picture !=''){
                                res.result[i].vehicle_picture =  res.result[i].vehicle_picture.split(',');
                                for(var j in res.result[i].vehicle_picture){
                                    res.result[i].vehicle_picture[j] = getApiHost + res.result[i].vehicle_picture[j];
                                }
                            }
                        }
                        vmPersonal.carList = res.result;
                   }else{
                       alertMsg(res.message,2);
                   }
                });
            },
            //车辆设置解绑
            unbindCar:function(el){
                localStorage.setItem('unbindId',el);
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['759px', '435px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['unbindCar.html']
                });
            },
            //车辆设置在线
            setOnline:function(el){
                getAjax(API.URL_POST_VEHICLESET,'post',{'_token_':vmPersonal.token,'car_id':el}).then(function(res){
                   if(res.code == 200){
                        alertMsg(res.message,1);
                   }else{
                       alertMsg(res.message);
                   }
                });
            },
        });
        vmPersonal.onLoad();
        avalon.scan(document.body);
    });
});