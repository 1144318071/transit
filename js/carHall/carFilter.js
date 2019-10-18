/*在售 即将上市 停售*/
$('.statusList li').click(function(){
    $(this).addClass('hightLight').siblings().removeClass('hightLight');
    $('.statusContent .statusDetail').eq($(this).index()).show().siblings().hide();
});
// 车型用途
$('.car_type li:not(:last-child)').click(function () {
    $('.filterNew .filterDetail').hide();
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
        $('.carLevel').css({'marginTop':'60px'})
    }else{
        node.hide();
        $('.carLevel').css({'marginTop':'0px'})
    }
});
// 电动货车选中
$('.newEnergy span').click(function(){
    $('.carApply li:not(:last-child)').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
    var node = $('.newEnergy');
    var flag = node.is(':hidden');
    // 隐藏
    if(flag){
        $('.carLevel').css({'marginTop':'60px'})
    }else{
        $('.carLevel').css({'marginTop':'0px'})
    }
    var text = $(this).text();
    var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
    $('.apply').html(html);
});
/*筛选条件的删除(卡车用途)*/
$(".apply").delegate(".del", "click", function () {
    $(this).parent().remove();
    $('.carApply li:not(:last-child)').removeClass('active');
    $('.newEnergy span').removeClass('active');
});
/*筛选条件的删除(品牌)*/
$(".brands").delegate(".del", "click", function () {
    $(this).parent().remove();
    $('.bandsDetail li').removeClass('active');
    $('.carBrandsDetail span').removeClass('active');
});
// 清除筛选条件
$('.delAll').click(function(){
    $(this).siblings().remove(); 
});
$('.carLevel li').click(function(){
    console.log('1231')
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
$(function(){
   avalon.ready(function(){
      window.vmCarFilter = avalon.define({
          $id : 'root',
          filterList:[],
          base_tonnage:[],//卡车级别
          group:[],//卡车品牌
          price:[],//价格
          onLoad:function(){
              vmCarFilter.getFilterCondition('TRADITIONAL');
          },
          getFilterCondition:function(car_type,type){
              vmCarFilter.filterList = [];
              var token = localStorage.getItem('token');
              var postData={
                  '_token_':token,
                  '_t':'',
                  '_m':''
              };
              postData._t = car_type;
              postData._m = type;
              getAjax(API.URL_GET_FILTERCONDITION,'get',postData).then(function(res){
                  vmCarFilter.base_tonnage = res.result[0];
                  vmCarFilter.group = res.result[1];
                  vmCarFilter.price = res.result[2];
                  vmCarFilter.filterList = res.result;
              });
          },
          mixed:function(res){
              $("#"+res).parent().show();
              $("#"+res).parent().parent().siblings().find('.carBrandsDetail').hide();
          },
          active:function (el) {
              $('#'+el).addClass('active').siblings().removeClass('active');

          }
      }) ;
      vmCarFilter.onLoad();
      avalon.scan(document.body);
   });
});