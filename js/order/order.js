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
$('.itemDetail').hover(function(){
    $(this).find('.description ul li:first-child').addClass('active').siblings().removeClass('active');
},function () {
    $(this).find('.description ul li:first-child').removeClass('active');
});
$(function(){
    avalon.ready(function(){
        window.vmOrderDriver = avalon.define({
            $id : 'root',
            onLoad:function(){

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
            // 取消货单
            orderCancel:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['876px', '625px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderCancel.html']
                });
            },
            // 投诉
            orderComplain: function () {
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['969px', '848px'],
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
                    area: ['969px', '848px'],
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
                    area: ['969px', '848px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderStating.html']
                });
            },
            // 查看路线
            checkLine:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1133px', '904px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/orderDriver/checkLine.html']
                });
            },
            // 查看详情
            checkDetail:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1133px', '743px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/orderDetail.html']
                });
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
            }
        });
        vmOrderDriver.onLoad();
        avalon.scan(document.body);
    });
});