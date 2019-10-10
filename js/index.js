function reinitIframe() {
    var iframe = document.getElementById("test");
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
    } catch (ex) { }
}
window.setInterval("reinitIframe()", 200);
// <div class='content'>
//     <iframe src="./views/home.html" id="test" name='test' width='100%' onload="this.height=100" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
// </div>
// 导航 
$('.layui-nav .layui-nav-item').on('click', function () {
    var src = $(this).attr('data-src');
    $('#test').attr('src',src);
    // location.href = src;
});
// function changeViews(el){
//     $('#test').attr('src', el);
// }
// 发布订单系列的内容
$('.hLine').hide();
$('.itemBox').hover(function(){
    $(this).addClass('active');
    $(this).find('.hLine').show();
    $(this).find('img').css({'width':'153px','height':'153px'});
},function(){
    $(this).removeClass('active');
    $(this).find('.hLine').hide();
    $(this).find('img').css({'width':'175px','height':'175px'})
});
$('.img_carSeries').hover(function(){
    $(this).find('.info_carSeries').show(500);
},function(){
    $(this).find('.info_carSeries').hide();
});
layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel,
        form = layui.form;
    //图片轮播
    carousel.render({
        elem: '#test10',
        width: '100%',
        height: '460px',
        interval: 3000
    });
    //监听开关
    form.on('switch(autoplay)', function () {
        ins3.reload({
            autoplay: this.checked
        });
    });
});
$(function(){

}); 