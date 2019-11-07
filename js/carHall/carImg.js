$('.tab-title li').click(function () {
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $('.tab-content .tab-detail').hide();
    $('.tab-content .tab-detail').eq($(this).index()).show();
});
$(function(){
    avalon.ready(function(){
        window.vmCarImg = avalon.define({
            $id:'root',
            onLoad:function(){

            },
        });
        vmCarImg.onLoad();
        avalon.scan(document.body);
    });
});