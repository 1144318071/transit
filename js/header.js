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
                // vmHeader.isLogin();
            },
            // 判断用户是否登录
            isLogin:function(){
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                //已经登录
                if(userInfo.mobile != ''){
                    vmHeader.userInfo = userInfo;
                    $('.userMsg').show();
                    $('.userLogin').hide();
                }else{
                    $('.userMsg').hide();
                    $('.userLogin').show();
                }
            },
            getPage:function(el){
                var src = el.currentTarget.dataset.src;
                $('#test').attr('src',src);
            }
        });
        vmHeader.onLoad();
        avalon.scan(document.body);
    });
});