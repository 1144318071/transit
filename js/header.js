// app下载
$('.downLoad').hover(function(){
    $(this).addClass('layui-this');
    $(this).find('.downloadApp').show();
},function(){
    $(this).removeClass('layui-this');
    $(this).find('.downloadApp').hide()
});
$('#avatar').click(function(){
   window.location.href = '../personal/personal.html';
});
//导航跳转
 $('.layui-nav .layui-nav-item').on('click', function () {
    var src = $(this).attr('data-src');
    location.href = src;
});
/*$('.layui-nav .layui-nav-item').hover(function(){
	$(this).addClass('layui-this');
},function(){
	$(this).removeClass('layui-this');
});*/

$(function(){
	$('.address').kuCity();
    avalon.ready(function(){
        avalon.config({debug: false});
        window.vmHeader = avalon.define({
            $id : 'header',
            userInfo:{},
            city:'',
            onLoad:function(){
                vmHeader.isLogin();
                /*城市定位*/
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398,39.897445);
                map.centerAndZoom(point,12);
                function myFun(result){
                    var cityName = result.name;
                    map.setCenter(cityName);
                    vmHeader.city = cityName;
                }
                var myCity = new BMap.LocalCity();
                myCity.get(myFun);
            },
            // 判断用户是否登录
            isLogin:function(){
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                //已经登录;
                if(userInfo != null){
                    vmHeader.userInfo = userInfo;
                    $('.userMsg').show();
                    $('.userLogin').hide();
                    if(vmHeader.userInfo.avatar !=''){
                        var src  = getApiHost + vmHeader.userInfo.avatar;
                        $('#avatar').attr('src',src)
                    }
                    var type = userInfo.type;
                    switch (type) {
                        case 'PERSONAL':
                            $('.logistics').attr('data-src','javascript:;');
                            $('.layui-nav-item .layui-nav-child').remove();
                        break;
                        case 'MERCHANT':
                            $('.logistics').attr('data-src','javascript:;');
                        break;
                        case 'LOGISTICS':
                            $('.layui-nav-item .layui-nav-child').remove();
                        break;
                        case 'PROXY':
                            $('.logistics').attr('data-src','javascript:;');
                            $('.layui-nav-item .layui-nav-child').remove();
                        break;
                        default:
                        break;
                    }
                }else{
                    $('.userMsg').hide();
                    $('.userLogin').show();
                    $('.logistics').attr('data-src','javascript:;');
                    $('.layui-nav-item .layui-nav-child').remove();
                }
            },
            setDisable:function(type){
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                /*没有登录则为游客(不可以查看物流管理以及企业商家内容)*/
                if(userInfo == null){
                    alertMsg('请先登录',5);
                }else{
                    if(type == 'MERCHANT'){
                        if(userInfo.type != "MERCHANT") {
                            alertMsg('此账号无权限查看该内容', 5);
                        }
                    }else if(type == 'LOGISTICS'){
                        if(userInfo.type != "LOGISTICS") {
                            alertMsg('此账号无权限查看该内容', 5);
                        }
                    }
                }
            },
            getPage:function(el){
                var src = el.currentTarget.dataset.src;
                location.href = src;
            },
            /*退出登录*/
            loginOut:function(){
                var token = localStorage.getItem('token');
                getAjax(API.URL_POST_LOGINOUT,'post',{'_token_':token}).then(function(res){
                    if(res.code == 200){
                        localStorage.clear();
                        location.href = '../../login.html';
                    }else{
                        alertMsg(res.message,2);
                    }
                })
            }
        });
        vmHeader.onLoad();
        avalon.scan(document.body);
    });
});
