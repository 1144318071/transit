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
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
});
$(function(){
    $('#distpicker').distpicker('reset', true);
});