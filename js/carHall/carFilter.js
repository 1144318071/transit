/*在售 即将上市 停售*/
$('.statusList li').click(function(){
    $(this).addClass('hightLight').siblings().removeClass('hightLight');
    $('.statusContent .statusDetail').eq($(this).index()).show().siblings().hide();
});
/*卡车用途筛选条件的选中*/
$('.filterItem>li:not(:first-child)').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    if(index != 5){
        var text = $(this).text();
        var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
        $('.apply').html(html);
    }
});
$('.filterItem').delegate('li:not(:first-child)','click',function(){
    $(this).addClass('active').siblings().removeClass('active');
});
/*电动货车的交互效果*/
$('.newEnergyTitle').hover(function(){
    $(this).find('.icon_arrow').css({'background-position-y':'-30px'});
    $(this).find('.newEnergyItem').show();
},function(){
    $(this).find('.icon_arrow').css({'background-position-y':'7px'});
    $(this).find('.newEnergyItem').hide();
});
/*电动货车的子选项选中*/
$('.newEnergyItem li').click(function(){
    $(this).addClass('hightLight').siblings().removeClass('hightLight');
    var text = $(this).text();
    console.log(text)
    var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
    $('.apply').html(html);
});
/*卡车品牌*/
$('.brandsItem li:not(:first-child)').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    if($(".allBrandsItem").is(":hidden")){
        $('.allBrandsItem').show(200);
    }else{
        $('.allBrandsItem').hide(200);
    }
});
$(".apply").delegate(".del", "click", function () {
    $(this).parent().remove();
    $('.carApply li:not(:last-child)').removeClass('active');
    $('.newEnergy span').removeClass('active');
});
function deleteItem(item){
    $(item).delegate(".del", "click", function () {
        $(this).parent().remove();
    });
}
deleteItem('.carLevelItem');
deleteItem('.allBrandsItemDetail');
deleteItem('.priceItemFilter');
deleteItem('.base_drive');
deleteItem('.base_long');
deleteItem('.container_long');
deleteItem('.base_quality');
deleteItem('.max_power');
deleteItem('.engine_emission');
deleteItem('.forward_gear');
deleteItem('.base_endurance');
deleteItem('.peak_power');
deleteItem('.battery_endurance');
deleteItem('.country');

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
    laypage.render({
        elem: 'demo3',
        count: 1000,
        theme: '#f57619'
    });
    laypage.render({
        elem: 'demo4',
        count: 1000,
        theme: '#f57619'
    });
});
/*排序(价格以及时间)*/
$('.sort li').click(function(){
    var text = $(this).find('.up').text();
    if(text == '↑'){
        $(this).find('.up').text('↓');
    }else{
        $(this).find('.up').text('↑');
    }
});
$(function(){
   avalon.ready(function(){
      window.vmCarFilter = avalon.define({
          $id : 'root',
          filterList:[],
          brandsList:[],
          filterBrandsList:[],
          anotherList:[],
          kind:'',
          keyword:'',
          /*筛选搜索*/
          filterSearch:{
              '_token_':'',
              '_t':'',
              '_m':'',
              'sha1':'',
              'base_tonnage':'',
              'price':'',
              'base_drive':'',
              'base_endurance':'',
              'base_long':'',
              'container_long':'',
              'base_quality':'',
              'engine_max_power':'',
              'gearbox_forward_gear':'',
              'engine_peak_power':'',
              'battery_endurance':'',
              'engine_fuel':'',
              'engine_emission':'',
              'country':'',
              'page':'',
              'limit':'',
              'status':'10',
              'order':'',//price desc 价格倒序  price asc价格升序 create_time desc 时间倒序 create_time asc时间升序
          },
          /*搜索出来的结果*/
          searchList:[],
          ZSList:[],
          SSList:[],
          TSList:[],
          countData:[],
          onLoad:function(){
              vmCarFilter.getFilterCondition('TRADITIONAL');
          },
          /*获取筛选条件*/
          getFilterCondition:function(car_type,type){
              vmCarFilter.filterList = [];
              vmCarFilter.anotherList = [];
              var token = localStorage.getItem('token');
              vmCarFilter.filterSearch._token_ = token;
              var postData={
                  '_token_':token,
                  '_t':'',
                  '_m':''
              };
              postData._t = car_type;
              postData._m = type;
              vmCarFilter.filterSearch._t = car_type;
              console.log(vmCarFilter.filterSearch._t);
              vmCarFilter.filterSearch._m = type;
              getAjax(API.URL_GET_FILTERCONDITION,'get',postData).then(function(res){
                  if(res.code == 200){
                      var result = res.result;
                      for(var i in result){
                          if(result[i].field == 'group'){
                              vmCarFilter.brandsList = result[i].group;
                          }
                          if(result[i].field != 'base_tonnage' && result[i].field != 'group' && result[i].field != 'price'){
                              vmCarFilter.anotherList.push(result[i])
                          }else{
                              vmCarFilter.filterList.push(result[i])
                          }
                      }
                      vmCarFilter.getSearchResult('10');
                  }else{
                      alertMsg(res.message,2);
                  }
              });
          },
          /*卡车品牌*/
          getBrandsList:function(el,item){
              $('#'+item).addClass('active').siblings().removeClass('active');
              if($(".allBrandsItem").is(":hidden")){
                  $('.allBrandsItem').show(200);
              }else{
                  $('.allBrandsItem').hide(200);
              }
                for(var i in vmCarFilter.brandsList){
                    if(vmCarFilter.brandsList[i].mixed == el){
                        vmCarFilter.filterBrandsList = vmCarFilter.brandsList[i].list;
                    }
                }
          },
          //样式渲染
          addStyle:function(el,kind,keyword){
              $('#'+el).addClass('active').siblings().removeClass('active');
              var text = $('#'+el).text();
              var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
              $('.'+kind).html(html);
              vmCarFilter.kind = kind;
              vmCarFilter.keyword = keyword;
              vmCarFilter.getSearchResult('10');
          },
          //在售 即将上市 停售
          getSearchResult:function(status){
              switch (vmCarFilter.kind ) {
                  case 'sha1':
                      vmCarFilter.filterSearch.sha1 = vmCarFilter.keyword;
                  break;
                  case 'base_tonnage':
                      vmCarFilter.filterSearch.base_tonnage = vmCarFilter.keyword;
                  break;
                  case 'price':
                      vmCarFilter.filterSearch.price = vmCarFilter.keyword;
                  break;
                  case 'base_drive':
                      vmCarFilter.filterSearch.base_drive = vmCarFilter.keyword;
                  break;
                  case 'base_endurance':
                      vmCarFilter.filterSearch.base_endurance = vmCarFilter.keyword;
                  break;
                  case 'base_long':
                      vmCarFilter.filterSearch.base_long = vmCarFilter.keyword;
                  break;
                  case 'container_long':
                      vmCarFilter.filterSearch.container_long = vmCarFilter.keyword;
                  break;
                  case 'base_quality':
                      vmCarFilter.filterSearch.base_quality = vmCarFilter.keyword;
                  break;
                  case 'engine_max_power':
                      vmCarFilter.filterSearch.engine_max_power = vmCarFilter.keyword;
                  break;
                  case 'gearbox_forward_gear':
                      vmCarFilter.filterSearch.gearbox_forward_gear = vmCarFilter.keyword;
                  break;
                  case 'engine_peak_power':
                      vmCarFilter.filterSearch.engine_peak_power = vmCarFilter.keyword;
                  break;
                  case 'battery_endurance':
                      vmCarFilter.filterSearch.battery_endurance = vmCarFilter.keyword;
                  break;
                  case 'engine_fuel':
                      vmCarFilter.filterSearch.engine_fuel = vmCarFilter.keyword;
                  break;
                  case 'engine_emission':
                      vmCarFilter.filterSearch.engine_emission = vmCarFilter.keyword;
                  break;
                  case 'country':
                      vmCarFilter.filterSearch.country = vmCarFilter.keyword;
                  break;
                  default:
                  break;
              }
              vmCarFilter.filterSearch.status = status;
              getAjax(API.URL_GET_FILTERSEARCH,'get',vmCarFilter.filterSearch).then(function(res){
                  if(res.code == 200){

                      vmCarFilter.searchList = res.result;
                      vmCarFilter.countData = res.result.count;
                      var result = res.result;
                      for(var i in result){
                          if(result[i].image !=''){
                              result[i].image = getApiHost + result[i].image;
                          }
                      }
                      var status = vmCarFilter.filterSearch.status;
                      switch (status) {
                          case '10':
                              vmCarFilter.ZSList = res.result;
                              break;
                          case '20':
                              vmCarFilter.TSList = res.result;
                              break;
                          case '30':
                              vmCarFilter.SSList = res.result;
                              break;
                          default:
                              break;
                      }
                  }else{
                      alertMsg(res.message,2);
                  }
              })
          },
          //搜索
          getSearchData:function(){

          },
          getMoreData:function(drive){
            console.log(drive)
          },
          getSortData:function (el) {
              var text = $('#'+el).find('.up').text();
          }
      }) ;
      vmCarFilter.onLoad();
      avalon.scan(document.body);
   });
});