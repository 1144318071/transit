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
        elem: 'demo1',
        count: 1,
        theme: '#f57619'
    });
});
$('.upload').hover(function(){
    $(this).find('.uploadimg').show();
},function(){
    $(this).find('.uploadimg').hide();
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
// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmPersonal.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
}
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
            },
            userInfo:{},
            couponList:[],
            bankCardList:[],
            carList:[],
            companyInfo:{},
            agentList:[],
            agentData:{
                '_token_':'',
                'page':'1',
                'limit':'4'
            },
            avatarData:{
                '_token_':'',
                'avatar':'',
            },
            newData:{
                '_token_':'',
                'page':1,
                'limit':7,
                'type':''
            },
            newsList:[],
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
                        if(res.result.avatar){
                            res.result.avatar = getApiHost + res.result.avatar;
                        }
                        /*res.result.avatar = '../../images/avatar.png';*/
                        vmPersonal.userInfo = res.result;
                        vmPersonal.newData.type = res.result.type;
                        var userType = res.result.type;
                        switch(userType){
                            case 'PERSONAL':
                                $('.companyInfo').remove();
                                vmPersonal.userInfo.type = '个人';
                                /*车辆列表*/
                                vmPersonal.getCarList();
                                $('.personalList .proxyAgent').remove();
                                $('.personalAgent').remove();
                            break;
                            case 'MERCHANT':
                                vmPersonal.userInfo.type = '商家';
                                $('.personalList li').eq(1).remove();
                                $('.vehicleManagement').remove();
                                $('.personalList .proxyAgent').remove();
                                $('.personalAgent').remove();
                            break;
                            case 'LOGISTICS':
                                vmPersonal.userInfo.type = '物流公司';
                                $('.personalList li').eq(1).remove();
                                $('.vehicleManagement').remove();
                                $('.personalList .proxyAgent').remove();
                                $('.personalAgent').remove();
                            break;
                            case 'PROXY':
                                vmPersonal.userInfo.type = '代理';
                                $('.personalList li').eq(1).remove();
                                $('.vehicleManagement').remove();
                            break;
                        }
                    }else{
                        checkToken(res);
                    }
                });
            },
            //获取优惠券列表
            getCouponList:function(status){
                vmPersonal.couponList=[];
                getAjax(API.URL_GET_COUPONLIST,'get',{'_token_':vmPersonal.token,'status':status}).then(function(res){
                   if(res.code == 200){
                       vmPersonal.couponList = res.result;
                   }else{
                       checkToken(res);
                   }
                });
            },
            //获取银行卡列表
            getBankCardList:function(){
                var token = localStorage.getItem('token')
                getAjax(API.URL_GET_BANKLIST,'get',{'_token_':token}).then(function(res){
                   if(res.code == 200){
                       for(var i in res.result){
                           res.result[i].card_number = stringHidePart(res.result[i].card_number);
                       }
                       vmPersonal.bankCardList = res.result;
                   }else{
                       checkToken(res);
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
                       checkToken(res);
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
                       checkToken(res);
                   }
                });
            },
            /*点击银行卡的时候获取银行卡列表*/
            getBankCar:function(){
                vmPersonal.getBankCardList();
            },
            /*代理商家列表*/
            getProxyList:function(){
                vmPersonal.agentData._token_ = localStorage.getItem('token');
                getAjax(API.URL_GET_PROXYLIST,'get',vmPersonal.agentData).then(function(res){
                    if(res.code == 200){
                        for(var i=0;i<res.result.list.length;i++){
                            res.result.list[i].avatar = getApiHost + res.result.list[i].avatar;
                            res.result.list[i].province = getProvinceName(res.result.list[i].province);
                            res.result.list[i].city = getCityName(res.result.list[i].city);
                            res.result.list[i].area = getAreaName(res.result.list[i].area);
                        }
                        vmPersonal.companyInfo = res.result;
                        vmPersonal.agentList = res.result.list;
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage,
                                layer = layui.layer;
                            laypage.render({
                                elem: 'demo3',
                                count: res.count,
                                limit: '4',
                                curr: vmPersonal.agentData.page,
                                theme: '#f57619',
                                jump: function(obj,first) {
                                    if(!first){
                                        vmPersonal.agentData.page = obj.curr;
                                        vmPersonal.getProxyList();
                                    }
                                }
                            });
                        });
                    }else{
                        checkToken(res);
                    }
                })
            },
            /*更换头像*/
            changeAvatar:function(){
                vmPersonal.avatarData._token_ = vmPersonal.token;
                getAjax(API.URL_POST_CHANGEAVATAR,'post',vmPersonal.avatarData).then(function(res){
                   if(res.code == 200){
                        alertMsg(res.message,1);
                   }else{
                       checkToken(res);
                   }
                });
            },
            //获取消息列表
            getNoticeList:function(){
                vmPersonal.newData._token_ = vmPersonal.token;
                getAjax(API.URL_POST_NOTICELIST,'post',vmPersonal.newData).then(function(res){
                   if(res.code == 200){
                       vmPersonal.newsList = res.result;
                       console.log(res.result);
                       layui.use(['laypage', 'layer'], function () {
                           var laypage = layui.laypage,
                               layer = layui.layer;
                           laypage.render({
                               elem: 'demo1',
                               count: res.count,
                               limit: '7',
                               curr: vmPersonal.newData.page,
                               theme: '#f57619',
                               jump: function(obj,first) {
                                   if(!first){
                                       vmPersonal.newData.page = obj.curr;
                                       vmPersonal.getNoticeList();
                                   }
                               }
                           });
                       });
                   }else{
                       checkToken(res);
                   }
                });
            },
        });
        vmPersonal.onLoad();
        avalon.scan(document.body);
    });
});
/*上传头像*/
layui.use('upload', function() {
    var token = localStorage.getItem('token');
    var $ = layui.jquery
        , upload = layui.upload;
    $.ajaxSetup({
        // 发送cookie
        xhrFields: {
            withCredentials: true
        },
    });
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,data:{'_token_':token}
        , url: API.URL_POST_UPLOADFILE
        , done: function (res) {
            if(res.code == 200){
                $('#avatarLogo').attr('src',getApiHost + res.result.crop);
                $('.personalLogo li img').attr('src',getApiHost + res.result.crop);
                vmPersonal.avatarData.avatar = res.result.crop;
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                userInfo.avatar = res.result.crop;
                localStorage.setItem('userInfo',JSON.stringify(userInfo));
                vmPersonal.changeAvatar();
                window.location.reload();
            }else{
                checkToken(res);
            }
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
});
