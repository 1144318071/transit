layui.use(['rate'], function() {
    var rate = layui.rate;
    //主题色
    rate.render({
        elem: '#test10'
        ,value: 5
        ,readonly: true
        ,theme: '#f57619' //自定义主题色
    });
});
$(function () {
    avalon.ready(function () {
        window.vmConfirmReceipt = avalon.define({
            $id: 'root',
            onLoad: function () {

            },
            return: function () {
                parent.layer.close(parent.layer.index);
            },
        });
        vmConfirmReceipt.onLoad();
        avalon.scan(document.body)
    });
});