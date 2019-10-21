$('.countItem').hover(function(){
    $(this).find('.mask').show();
},function(){
    $(this).find('.mask').hide();
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
$('.drivers .title li').click(function(){
   $(this).addClass('active').siblings().removeClass('active');
   $('.itemCon .item').eq($(this).index()).show().siblings().hide();
});
$(function(){
    // checkOrders
    avalon.ready(function(){
        window.vmLogistics = avalon.define({
            $id : 'root',
            onLoad:function(){

            },
            // 查看所有订单记录
            checkOrders:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1168px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['totalOrders.html']
                });
            },
            // 查看总订单金额
            checkAmount:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1168px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['totalAmount.html']
                });
            }
        });
        vmLogistics.onLoad();
        avalon.scan(document.body);
    });
});
