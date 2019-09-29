// $(document).scroll(function () { //页面加载时，获取滚动条初始高度
//     var distance = $(document).scrollTop(); //获取滚动条初始高度的值 ：0
//     if (distance >= 80) {
//         $('.header').addClass('fixHeader');
//     } else {
//         $('.header').removeClass('fixHeader');
//     }
// });
$('.layui-nav .layui-nav-item:not(:last-child)').on('click', function () {
    var src = $(this).attr('data-src');
    location.href = src;
});
// app下载
$('.downLoad').hover(function(){
    $(this).addClass('layui-this');
    $(this).siblings().removeClass('layui-this');
    $(this).find('.downloadApp').slideDown();

},function(){
    $(this).removeClass('layui-this');
    $(this).find('.downloadApp').slideUp();
});