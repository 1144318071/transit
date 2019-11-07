layui.use(['rate'], function() {
    var rate = layui.rate;
    //主题色
    rate.render({
        elem: '#test10'
        ,value: 0
        ,theme: '#f57619' //自定义主题色
        ,text: true
    });
});
$(function () {
    avalon.ready(function () {
        window.vmConfirmReceipt = avalon.define({
            $id: 'root',
            postData:{
                '_token_':'',
                'order_id':'',
                'star':'',
                'content':''
            },
            onLoad: function () {

            },
            return: function () {
                parent.layer.close(parent.layer.index);
            },
            //确认收货
            confirmReceipt:function(){
                vmConfirmReceipt.postData._token_ = localStorage.getItem('token');
                vmConfirmReceipt.postData.order_id = localStorage.getItem('confirmId');
                vmConfirmReceipt.postData.star = $('#test10>span').text().substr(0,1);
                getAjax(API.URL_POST_GOODSCONFIRMRECEIPT,'post',vmConfirmReceipt.postData).then(function(res){
                   if(res.code == 200){
                       alertMsg(res.message);
                       setTimeout(function(){
                           window.parent.location.reload();
                           parent.layer.close(parent.layer.index);
                       },1000)
                   }else{
                       alertMsg(res.message,2);
                   }
                });
            },
        });
        vmConfirmReceipt.onLoad();
        avalon.scan(document.body)
    });
});