$(function(){
    avalon.ready(function(){
        window.vmMuckOrderState = avalon.define({
           $id:'root',
            onLoad:function () {

            },
            stateSuccess:function () {
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['876px', '513px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/muckStateSuccess.html']
                });
            }
        });
        vmMuckOrderState.onLoad();
        avalon.scan(document.body);
    });
})