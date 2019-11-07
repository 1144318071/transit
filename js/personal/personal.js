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
        elem: '#test1' //指定元素
    });
});
$(function(){
    avalon.ready(function(){
        window.vmPersonal = avalon.define({
            $id : 'root',
            token:'',
            onLoad:function(){
                var token = localStorage.getItem('token');
                vmPersonal.token = token;
                vmPersonal.getUserInfo();
                vmPersonal.getBankCardList();
            },
            userInfo:{},
            couponList:[],
            bankCardList:[],
            changePwd:function(){
                var userType = JSON.parse(localStorage.getItem('userInfo')).type;
                localStorage.setItem('_t', userType);
                location.href = '../../views/login/changePwd.html';
            },
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
                /*layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['759px', '470px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['carChecking.html']
                });*/
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
            // 设为默认
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
            //解绑
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
                                /*$('.personalList li').eq(1).hide();
                                $('.vehicleManagement').hide();*/
                                break;
                        }
                    }else{
                        alertMsg(res.message,2);
                    }
                });
                vmPersonal.getCouponList('10');
            },
            //获取优惠券
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
            }
        });
        vmPersonal.onLoad();
        avalon.scan(document.body);
    });
});