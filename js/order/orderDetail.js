$(function(){
    avalon.ready(function(){
        window.vmOrderDetail = avalon.define({
            $id:'root',
            onLoad:function(){
                console.log('查看详情');
            }
        });
        vmOrderDetail.onLoad();
        avalon.scan(document.body);
    });
});