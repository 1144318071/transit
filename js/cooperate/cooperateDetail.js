function wordStatic(content,input) {
    // 获取要显示已经输入字数文本框对象
    // var content = document.getElementsByClassName('num')[0];
    if (content && input) {
        // 获取输入框输入内容长度并更新到界面
        var value = input.value;
        // 将换行符不计算为单词数
        value = value.replace(/\n|\r/gi, "");
        // 更新计数
        content.innerText = value.length;
    }
};
$(".business:first-child").keyup(function () {
    var content = document.getElementsByClassName('num')[0];
    wordStatic(content,this)
});
$(".logistics").keyup(function () {
    var content = document.getElementsByClassName('num')[1];
    wordStatic(content, this)
});
$(".agent").keyup(function () {
    var content = document.getElementsByClassName('num')[2];
    wordStatic(content, this)
});
$(".ads").keyup(function () {
    var content = document.getElementsByClassName('num')[3];
    wordStatic(content, this)
});
// tab菜单切换
$('.tabs li').click(function(){
    $('.formItem li input[type="text"]').val('');
    $('#distpicker').distpicker('reset', true);
    $('.formItem li textarea').val('');
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
});
var url = window.location.href;
var urlJson = GetRequest(url);
var activeItem = urlJson.item;
switch (activeItem) {
    case '10':
        $('.tabs li').eq(0).addClass('active').siblings().removeClass('active');
        $('.tabContent .tabItem').eq(0).show().siblings().hide();
    break;
    case '20':
        $('.tabs li').eq(1).addClass('active').siblings().removeClass('active');
        $('.tabContent .tabItem').eq(1).show().siblings().hide();
    break;
    case '30':
        $('.tabs li').eq(2).addClass('active').siblings().removeClass('active');
        $('.tabContent .tabItem').eq(2).show().siblings().hide();
    break;
    case '40':
        $('.tabs li').eq(3).addClass('active').siblings().removeClass('active');
        $('.tabContent .tabItem').eq(3).show().siblings().hide();
    break;
}
$(function(){
    $('#distpicker').distpicker('reset', true);
    avalon.ready(function(){
        window.vmCooperate = avalon.define({
           $id : 'root',
            getCode:{
               'province':'',
                'city':''
            },
            postData:{
                '_token_':'',
                'type':'',
                'c_name':'',
                'u_name':'',
                'u_phone':'',
                'information':'',
                'car_num':'',//车辆数量
                'province':'',
                'city':'',
                'ad_type':''
            },
           onLoad:function(){

           },
            getPCode:function(){
                vmCooperate.postData.province = $("#province1 option[value =" + vmCooperate.getCode.province + "]").attr('data-code');
            },
            getCCode:function(){
                vmCooperate.postData.city = $("#city1 option[value =" + vmCooperate.getCode.city + "]").attr('data-code');
            },
            cooperate:function (item) {
                var token = localStorage.getItem('token');
                vmCooperate.postData._token_ = token;
                vmCooperate.postData.type = item;
                console.log(vmCooperate.postData)
                getAjax(API.URL_POST_ABOUTTEAMWORK,'post',vmCooperate.postData).then(function (res) {
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        alertMsg(res.message,2);
                    }
                })
            }
        });
        vmCooperate.onLoad();
        avalon.scan(document.body);
    });
});
