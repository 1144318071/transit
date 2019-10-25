$(function () {
    avalon.ready(function () {
        window.vmDrawback = avalon.define({
            $id: 'root',
            onLoad: function () {

            },
            return: function () {
                parent.layer.close(parent.layer.index);
            },
            //补传凭证
            addProve:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1133px', '904px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/order/addProve.html']
                });
            }
        });
        vmDrawback.onLoad();
        avalon.scan(document.body)
    });
});