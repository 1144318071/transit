$('.tabTitle li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
})
$('.tabType li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});
/*城市定位*/
// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.331398,39.897445);
map.centerAndZoom(point,12);
function myFun(result){
    var cityName = result.name;
    map.setCenter(cityName);
    vmOrder.city = cityName;
};
var myCity = new BMap.LocalCity();
myCity.get(myFun);

// 公共方法
function checkToken(res) {
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
        window.vmOrder = avalon.define({
            $id : 'root',
            state:'',
            /* 'keyword':'',*/
            postData:{
                '_token_':'',
                'page':'1',
                'limit':'6',
                'order_status':'',
                'goods_status':''
            },
            city:'成都市',
            onlineCar:'0',
            orderList_one:[],
            orderList_two:[],
            orderList:[],
            DZFList:[],//待支付
            DJDList:[],//待接单
            DZHList:[],//待装货
            YSZList:[],//运输中
            DQSList:[],//待签收
            TSList:[],//投诉
            TKList:[],//退款/赔付
            merchantInfo:{},
            onLoad:function(){
                vmOrder.getUrl();
                vmOrder.getStatusOrder('demo1','','');
                vmOrder.getMerchantInfo();
                vmOrder.getOnlineCar();
            },
            // 查看评价
            checkRate:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['963px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/orderDriver/orderRate.html']
                });
            },
            // (待接单中的)取消货单
            orderCancel:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['876px', '625px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderCancel.html']
                });
                localStorage.setItem('cancelId',el);
            },
            //接单后取消订单
            closeOrder:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['876px', '625px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderCancel_d.html']
                });
                localStorage.setItem('cancelId',el);
            },
            // 投诉
            orderComplain: function (el) {
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['973px', '750px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderComplain.html']
                });
                localStorage.setItem('stateId',el)
            },
            // 投诉
            orderState:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1121px', '758px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderState.html']
                });
                localStorage.setItem('stateId',el)
            },
            // 申述中
            orderStating:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['973px', '927px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderStating.html']
                });
            },
            // 查看路线
            checkLine:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1133px', '904px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/checkLine.html']
                });
                localStorage.setItem('checkLineId',el);
            },
            // 货物运输查看详情
            checkDetail:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1133px', '743px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderDetail.html']
                });
                localStorage.setItem('goods_checkId',el)
            },
            //渣土(查看详情)
            checkMuckDetail:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1133px', '629px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/checkMuckDetail.html']
                });
            },
            //渣土运输报名详情
            muckSignDetail:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1012px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/muckSignDetail.html']
                });
            },
            //运输报表
            transportReport:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1012px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/transportReport.html']
                });
            },
            //渣土运输订单申诉
            muckOrderState:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1121px', '810px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/muckOrderState.html']
                });
            },
            //确认收货
            confirmReceipt:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['940px', '560px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/confirmReceipt.html']
                });
                localStorage.setItem('confirmId',el)
            },
            //确认装货
            confirmLoad:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['876px', '625px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/confirmLoad.html']
                });
                localStorage.setItem('loadId',el)
            },
            //退款弹窗显示
            drawback:function(el){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['973px', '844px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/drawback.html']
                });
                localStorage.setItem('drawbackId',el);
            },
            getUrl:function(){
                var url = window.location.href;
                var urlJson = GetRequest(url);
                if(urlJson.state == '10'){
                    $('#tabType').hide();
                    $('.countItem:nth-child(2)').css({'marginTop':'0px'})
                }
            },
            //获取商家信息
            getMerchantInfo:function(){
                var token = localStorage.getItem('token');
                vmOrder.postData._token_ = token;
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_' : token}).then(function(res){
                    if(res.code == 200){
                        if(res.result.company_logo !=''){
                            res.result.company_logo = getApiHost + res.result.company_logo;
                        }
                        res.result.province = getProvinceName(res.result.province);
                        res.result.city = getCityName(res.result.city);
                        res.result.area = getAreaName(res.result.area);
                        vmOrder.merchantInfo = res.result;
                    }else{
                        checkToken(res);
                    }
                });
            },
            //获取订单列表
            getOrderList:function(elem,goods_status,order_status){
                vmOrder.postData._token_ = localStorage.getItem('token');
                vmOrder.orderList = [];
                vmOrder.DZFList = [];//待支付
                vmOrder.DJDList = [];//待接单
                vmOrder.DZHList = [];//待装货
                vmOrder.YSZList = [];//运输中
                vmOrder.DQSList = [];//待签收
                vmOrder.TSList = [];//投诉
                vmOrder.TKList = [];//退款/赔付
                vmOrder.postData.goods_status = goods_status;
                vmOrder.postData.order_status = order_status;
                getAjax(API.URL_GET_ORDERTWO,'get',vmOrder.postData).then(function(res){
                    vmOrder.getPageList(elem,res.count,goods_status,order_status);
                    if(res.code == 200) {
                        var result = res.result;
                        for (var i in result) {
                            result[i].start_address.city = getCityName(result[i].start_address.city);
                            result[i].start_address.area = getAreaName(result[i].start_address.area);
                            result[i].end_address.city = getCityName(result[i].end_address.city);
                            result[i].end_address.area = getAreaName(result[i].end_address.area);
                            result[i].goods_images = getApiHost + result[i].goods_images;
                            if(res.result[i].goods_status == '40'){
                                /*res.result[i].name = res.result[i].name.substr(0,1)+'师傅';*/
                                res.result[i].tell = getApiHost + res.result[i].tell;
                            }
                        };
                        if(goods_status){
                            if(goods_status=='10'){//待支付
                                vmOrder.DZFList = res.result;
                                console.log('待支付',vmOrder.DZFList)
                            }else if(goods_status=='20'){//待接单
                                vmOrder.DJDList = res.result;
                                console.log('待接单',vmOrder.DJDList)
                            }else{
                                if(goods_status=='40'){
                                    if(order_status=='10'){//待装货
                                        vmOrder.DZHList = res.result;
                                        console.log('待装货',vmOrder.DZHList)
                                    }else if(order_status=='20'){//运输中
                                        vmOrder.YSZList = res.result;
                                        console.log('运输中',vmOrder.YSZList)
                                    }else if(order_status=='40'){//待签收
                                        vmOrder.DQSList = res.result;
                                        console.log('待签收',vmOrder.DQSList)
                                    }
                                }else{
                                    if(goods_status==60){
                                        vmOrder.TSList = res.result;
                                        console.log('投诉',vmOrder.TSList)
                                    }else if(goods_status==70){
                                        vmOrder.TKList = res.result;
                                        console.log('退款',vmOrder.TKList)
                                    }
                                }
                            }
                        }else{//goods_status==''    全部订单
                            vmOrder.orderList = res.result;
                            console.log('全部',vmOrder.orderList)
                        }
                    }else{
                        checkToken(res);
                    }
                });
            },
            //分页
            getPageList:function(elem,count,goods_status,order_status){
                if(count > 6){
                    layui.use(['laypage', 'layer'], function () {
                        var laypage = layui.laypage,
                            layer = layui.layer;
                        laypage.render({
                            elem: elem,
                            count: count,
                            limit: '6',
                            curr: vmOrder.postData.page,
                            theme: '#f57619',
                            jump: function(obj,first) {
                                if(!first){
                                    vmOrder.postData.page = obj.curr;
                                    vmOrder.getOrderList(elem,goods_status,order_status);
                                }
                            }
                        });
                    });
                }
            },
            //根据订单状态请求数据
            getStatusOrder:function(el,good_status,order_status){
                vmOrder.postData.page = '1';
                //vmOrder.postData.keyword='';
                vmOrder.getOrderList(el,good_status,order_status);
            },
            //删除货单
            deleteOrder:function(el,demo,goods_status,order_status){
                var postData={
                    '_token_':vmOrder.postData._token_,
                    'order_id':el
                }
                getAjax(API.URL_POST_GOODSDEL,'post',postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        //删除之后重新请求数据
                        vmOrder.getOrderList(demo,goods_status,order_status);
                    }else{
                        checkToken(res);
                    }
                });
            },
            //搜索
            getSearchList:function (el,good_status,order_status) {
                vmOrder.postData.page = '1';
                vmOrder.getOrderList(el,good_status,order_status);
            },
            /*设置交互样式*/
            setActive:function(el){
                $('#'+el).find('.description ul li:first-child').addClass('active').siblings().removeClass('active');
            },
            removeActive:function(el){
                $('#'+el).find('.description ul li:first-child').removeClass('active');
            },
            //显示电话号码
            showModel:function (el) {
                $('#'+el).find('.model').show();
            },
            hideModel:function(el){
                $('#'+el).find('.model').hide();
            },
            /*获取在线车辆*/
            getOnlineCar:function(){
                var token = localStorage.getItem('token');
                getAjax(API.URL_GET_ONLINECAR,'get',{'_token_':token}).then(function(res){
                   if(res.code == 200){
                       vmOrder.onlineCar = res.result.onlineCar;
                   }else{
                       checkToken(res);
                   }
                });
            }
        });
        vmOrder.onLoad();
        avalon.scan(document.body);
    });
});
