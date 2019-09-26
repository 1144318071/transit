$('.statusList li').click(function(){
    $(this).addClass('hightLight').siblings().removeClass('hightLight');
    $('.statusContent .statusDetail').eq($(this).index()).show().siblings().hide();
});
// 车型用途
$('.carApply li:not(:last-child)').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.newEnergy span').removeClass('active');
    var text = $(this).text();
    var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
    $('.apply').html(html)
});
// 电动货车
$('.tri').click(function () {
    var node = $('.newEnergy');
    var flag = node.is(':hidden');
    // 隐藏
    if(flag){
        node.show();
        $('.carBrands, .selected').css({'marginTop':'60px'})
    }else{
        node.hide();
        $('.carBrands, .selected').css({'marginTop':'20px'})
    }
});
// 电动货车选中
$('.newEnergy span').click(function(){
    $('.carApply li:not(:last-child)').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
    var text = $(this).text();
    var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
    $('.apply').html(html);
});
// 卡车品牌的字母选中
$('.bandsDetail li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});
// 卡车品牌选中
$('.carBrandsDetail span').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var text = $(this).text();
    var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
    $('.brands').html(html);
});
// 删除单个筛选条件
$(".apply").delegate(".del", "click", function () {
    $(this).parent().remove();
    $('.carApply li:not(:last-child)').removeClass('active');
    $('.newEnergy span').removeClass('active');
});
$(".brands").delegate(".del", "click", function () {
    $(this).parent().remove();
    $('.bandsDetail li').removeClass('active');
    $('.carBrandsDetail span').removeClass('active');
});
// 清除筛选条件
$('.delAll').click(function(){
    $(this).siblings().remove(); 
});
// 分页
layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
        layer = layui.layer;
    //自定义样式
    laypage.render({
        elem: 'demo2',
        count: 1000,
        theme: '#f57619'
    });
});