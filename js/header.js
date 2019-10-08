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
$(function(){
    avalon.ready(function(){
        window.vmHeader = avalon.define({
            $id : 'header',
            userInfo:{},
            onLoad:function(){
                vmHeader.isLogin();
            },
            // 判断用户是否登录
            isLogin:function(){
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if(userInfo){
                    // 已经登录
                    vmHeader.userInfo = userInfo;
                    console.log(userInfo);
                    $('.userMsg').show();
                    $('.userLogin').hide();
                }else{
                    $('.userMsg').hide();
                    $('.userLogin').show();

                }
            },
            // 城市选择插件
            citySelect:function(){
                top.layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['963px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['/views/header/citySelect.html']
                });
            }
        });
        vmHeader.onLoad();
        avalon.scan(document.body);
    });
});