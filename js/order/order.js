layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
    layer = layui.layer;
    //自定义样式
    laypage.render({
        elem: 'demo1',
        count: 1000,
        theme: '#f57619'
    });
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
    laypage.render({
        elem: 'demo4',
        count: 1000,
        theme: '#f57619'
    });
    laypage.render({
        elem: 'demo5',
        count: 1000,
        theme: '#f57619'
    });
    laypage.render({
        elem: 'demo6',
        count: 1000,
        theme: '#f57619'
    });
    laypage.render({
        elem: 'demo7',
        count: 1000,
        theme: '#f57619'
    });
});
$('.tabTitle li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
})
$('.tabType li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});
$(function(){
    avalon.ready(function(){
        window.vmOrder = avalon.define({
            $id : 'root',
            state:'',
            postData:{
                '_token_':'',
                'keyword':'',
                'page':'1',
                'limit':'5',
                'order_status':'',
                'goods_status':''
            },
            orderList:[],
            merchantInfo:{},
            onLoad:function(){
                vmOrder.getUrl();
                vmOrder.getMerchantInfo();
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
            orderComplain: function () {
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['973px', '750px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderComplain.html']
                });
            },
            // 申诉
            orderState:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1121px', '758px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderState.html']
                });
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
            confirmReceipt:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['940px', '560px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/confirmReceipt.html']
                });
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
            //退款
            drawback:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['973px', '844px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/drawback.html']
                });
            },
            getUrl:function(){
                var url = window.location.href;
                var urlJson = GetRequest(url);
                if(urlJson.state == '10'){
                    $('#tabType').hide();
                    $('.order').css({'margin-top':'240px'});
                }
            },
            //获取商家信息
            getMerchantInfo:function(){
                var token = localStorage.getItem('token');
                vmOrder.postData._token_ = token;
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_' : token}).then(function(res){
                    if(res.result.company_logo !=''){
                        var src = getApiHost + res.result.company_logo;
                        $('#companyLogo').attr('src',src)
                    }
                    res.result.province = getProvinceName(res.result.province);
                    res.result.city = getCityName(res.result.city);
                    res.result.area = getAreaName(res.result.area);
                    vmOrder.merchantInfo = res.result;
                });
            },
            //获取订单列表
            getOrderList:function(elem,goods_status,order_status){
                vmOrder.orderList = [];
                vmOrder.postData.goods_status = goods_status;
                vmOrder.postData.order_status = order_status;
                getAjax(API.URL_GET_ORDERLIST,'get',vmOrder.postData).then(function(res){
                    if(res.code == 200) {
                        vmOrder.getPageList(elem,res.count,goods_status,order_status);
                        var result = res.result;
                        for (var i in result) {
                            result[i].start_address.city = getCityName(result[i].start_address.city);
                            result[i].start_address.area = getAreaName(result[i].start_address.area);
                            result[i].end_address.city = getCityName(result[i].end_address.city);
                            result[i].end_address.area = getAreaName(result[i].end_address.area);
                            result[i].goods_images = getApiHost + result[i].goods_images;
                        }
                        vmOrder.orderList = res.result;
                    }
                });
            },
            //分页
            getPageList:function(elem,count,goods_status,order_status){
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage,
                        layer = layui.layer;
                    laypage.render({
                        elem: elem,
                        count: count,
                        limit: '5',
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
            },
            //根据订单状态请求数据
            getStatusOrder:function(el,good_status,order_status){
                vmOrder.postData.page = '1';
                vmOrder.postData.keyword='';
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
        });
        vmOrder.onLoad();
        avalon.scan(document.body);
    });
});