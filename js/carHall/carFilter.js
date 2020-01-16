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
    var html = "<li class='delItem'>" + text + "<span class = 'del'> x </span></li>";
    $('.apply').html(html);
});
/*卡车品牌*/
$('.brandsItem li:not(:first-child)').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.allBrandsItem').show();
    /*if($(".allBrandsItem").is(":hidden")){
    $('.allBrandsItem').show(200);
    }else{
        $('.allBrandsItem').hide(200);
    }*/
});
$(".apply").delegate(".del", "click", function () {
    $(this).parent().remove();
    $('.carApply li:not(:last-child)').removeClass('active');
    $('.newEnergy span').removeClass('active');
});
function deleteItem(item){
    $(item).delegate(".del", "click", function () {
        $(this).parent().remove();
        $(item +'Item').removeClass('active');
        var el = item.slice(1);
        switch(el){
            case 'base_tonnage':
                vmCarFilter.filterSearch.base_tonnage='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'sha1':
                vmCarFilter.filterSearch.sha1='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'price':
                vmCarFilter.filterSearch.price='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'base_drive':
                vmCarFilter.filterSearch.base_drive='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'base_long':
                vmCarFilter.filterSearch.base_long='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'container_long':
                vmCarFilter.filterSearch.container_long='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'base_quality':
                vmCarFilter.filterSearch.base_quality='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'engine_max_power':
                vmCarFilter.filterSearch.base_tonnage='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'engine_emission':
                vmCarFilter.filterSearch.engine_max_power='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'engine_fuel':
                vmCarFilter.filterSearch.engine_fuel='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'gearbox_forward_gear':
                vmCarFilter.filterSearch.gearbox_forward_gear='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'engine_peak_power':
                vmCarFilter.filterSearch.engine_peak_power='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'battery_endurance':
                vmCarFilter.filterSearch.battery_endurance='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            case 'country':
                vmCarFilter.filterSearch.country='';
                vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
            break;
            default:
            break;
        }
    });
}
deleteItem('.base_tonnage');
deleteItem('.sha1');
deleteItem('.price');
deleteItem('.base_drive');
deleteItem('.base_long');
deleteItem('.container_long');
deleteItem('.base_quality');
deleteItem('.engine_max_power');
deleteItem('.engine_emission');
deleteItem('.engine_fuel');
deleteItem('.gearbox_forward_gear');
deleteItem('.engine_peak_power');
deleteItem('.base_endurance');
deleteItem('.engine_peak_power');
deleteItem('.battery_endurance');
deleteItem('.country');
// 清除筛选条件
$('.delAll').click(function(){
    $(this).siblings().remove();
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
// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let code = res.code;
    if (tokenCode.indexOf(code) < 0) {
        alertMsg(res.message,2);
    }
}
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
              'page':'1',
              'limit':'5',
              'status':'10',
              'order':'',//price desc 价格倒序  price asc价格升序 create_time desc 时间倒序 create_time asc时间升序
              'series':'',
          },
          /*最大价格和最小价格*/
          price:{
              'minPrice':'',
              'maxPrice':''
          },
          /*搜索出来的结果*/
          searchList:[],
          ZSList:[],
          SSList:[],
          TSList:[],
          countData:[],
          filterType:'',
          onLoad:function(){
              vmCarFilter.getParams();
          },
          getParams:function(){
              var src = window.location.href;
              var params = GetRequest(src);
              var filterType = params.filterType;
              var keyword = localStorage.getItem('searchKeyWord');
              if(keyword != null){
                  vmCarFilter.filterSearch.series = keyword;
              }
              if(filterType){
                  switch(filterType){
                      /*轻卡*/
                      case '10':
                          var html = "<label>轻卡<span class = 'del'> x </span></label>";
                          $('.carLevelItem').html(html);
                          vmCarFilter.kind = 'base_tonnage';
                          vmCarFilter.keyword = '20';
                          vmCarFilter.getFilterCondition('TRADITIONAL');
                          $('.carLevel li:nth-child(4)').addClass('active');
                          break;
                      /*重卡*/
                      case '20':
                          var html = "<label class='delItem'>重卡<span class = 'del'> x </span></label>";
                          $('.carLevelItem').html(html);
                          vmCarFilter.kind = 'base_tonnage';
                          vmCarFilter.keyword = '40';
                          vmCarFilter.getFilterCondition('TRADITIONAL');
                          $('.carLevel li:nth-child(6)').addClass('active');
                          break;
                      /*牵引车*/
                      case '30':
                          vmCarFilter.getFilterCondition('TRADITIONAL','20');
                          $('.carApply>li:nth-child(3) ').addClass('active').siblings().removeClass('active');
                          var html = "<label class='delItem'>牵引车<span class = 'del'> x </span></label>";
                          $('.apply').html(html);
                      break;
                      /*载货车*/
                      case '40':
                          vmCarFilter.getFilterCondition('TRADITIONAL','10');
                          $('.carApply>li:nth-child(4) ').addClass('active').siblings().removeClass('active');
                          var html = "<label class='delItem'>载货车<span class = 'del'> x </span></label>";
                          $('.apply').html(html);
                      break;
                      /*自卸车*/
                      case '50':
                          vmCarFilter.getFilterCondition('TRADITIONAL','30');
                          $('.carApply>li:nth-child(5) ').addClass('active').siblings().removeClass('active');
                          var html = "<label class='delItem'>自卸车<span class = 'del'> x </span></label>";
                          $('.apply').html(html);
                      break;
                      /*新能源*/
                      case '60':
                          /*点击新能源的时候默认加载电动载货车的数据*/
                          vmCarFilter.getFilterCondition('ENERGY','10');
                          $('.carApply>li').removeClass('active');
                          $('.newEnergyTitle').find('.icon_arrow').css({'background-position-y':'-30px'});
                          $('.newEnergyItem li:first-child').addClass('hightLight').siblings().removeClass('hightLight');
                          var html = "<label class='delItem'>电动载货车<span class = 'del'> x </span></label>";
                          $('.apply').html(html);
                          $('.newEnergyTitle').find('.newEnergyItem').show();
                      break;
                      /*二手车*/
                      case '60':
                          vmCarFilter.getFilterCondition('TRADITIONAL');
                      break;
                      default:
                      break;
                  }
              }else{
                  vmCarFilter.getFilterCondition('TRADITIONAL');
              };
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
                      vmCarFilter.getSearchResult('10')
                  }else{
                      checkToken(res);
                  }
              });
          },
          /*卡车品牌*/
          getBrandsList:function(el,item){
              $('#'+item).addClass('active').siblings().removeClass('active');
              $('.allBrandsItem').toggle();
             /* if($(".allBrandsItem").is(":hidden")){
                  $('.allBrandsItem').show(200);
              }else{
                  $('.allBrandsItem').hide(200);
              }*/
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
              var html = "<label>"+text + "<span class = 'del'> x </span></label>";
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
              };
              var min = vmCarFilter.price.minPrice;
              var max = vmCarFilter.price.maxPrice;
              if(min != '' && max != ''){
                  $('.priceItem>li:not(:first-child)').removeClass('active');
                  vmCarFilter.filterSearch.price='80';
                  vmCarFilter.filterSearch.min=min;
                  vmCarFilter.filterSearch.max=max;
              }
              vmCarFilter.filterSearch.status = status;
              getAjax(API.URL_GET_FILTERSEARCH,'get',vmCarFilter.filterSearch).then(function(res){
                  if(res.code == 200){
                      vmCarFilter.countData = res.result.count;
                      for(var i = 0;i<res.result.list.length;i++){
                          res.result.list[i].image = getApiHost + res.result.list[i].image;
                      }
                      vmCarFilter.searchList = res.result.list;
                      var pageDemo;
                      var status = vmCarFilter.filterSearch.status;
                      switch (status) {
                          case '10':
                              vmCarFilter.ZSList = res.result;
                              pageDemo='demo2';
                          break;
                          case '20':
                              vmCarFilter.TSList = res.result;
                              pageDemo='demo4';
                          break;
                          case '30':
                              vmCarFilter.SSList = res.result;
                              pageDemo='demo3';
                          break;
                          default:
                          break;
                      }
                      vmCarFilter.getPageList(pageDemo,res.count);
                  }else{
                      checkToken(res);
                  }
              })
          },
          //输入车系名称进行搜索
          getSearchData:function(){
              vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
          },
          getPrice:function () {
              var min = vmCarFilter.price.minPrice;
              var max = vmCarFilter.price.maxPrice;
              if(min != '' && max != ''){
                  $('.priceItem>li:not(:first-child)').removeClass('active');
                  vmCarFilter.filterSearch.price='80';
                  vmCarFilter.filterSearch.min=min;
                  vmCarFilter.filterSearch.max=max;
                  setTimeout(function(){
                      vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
                  },1000);
              }
          },
          /*分页*/
          getPageList:function(elem,count){
              if(count >=1 ){
                  layui.use(['laypage', 'layer'], function () {
                      var laypage = layui.laypage,
                          layer = layui.layer;
                      laypage.render({
                          elem: elem,
                          count: count,
                          limit: '5',
                          curr: vmCarFilter.filterSearch.page,
                          theme: '#f57619',
                          jump: function(obj,first) {
                              if(!first){
                                  vmCarFilter.filterSearch.page = obj.curr;
                                  vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
                              }
                          }
                      });
                  });
              };
          },
          /*获取(最新、价格)排序的数据*/
          //price desc 价格倒序  price asc价格升序 create_time desc 时间倒序 create_time asc时间升序
          getSortData:function () {
              var create_time = $('#newest').find('.up').text();
              var price = $('#priceSort').find('.up').text();
              if(create_time == '↑' && price == '↑'){
                  vmCarFilter.filterSearch.order = 'create_time asc,price asc';
              }else if(create_time == '↑' && price == '↓'){
                  vmCarFilter.filterSearch.order = 'create_time asc,price desc';
              }else if(create_time == '↓' && price == '↑'){
                  vmCarFilter.filterSearch.order = 'create_time desc,price asc';
              }else if(create_time == '↓' && price == '↓'){
                  vmCarFilter.filterSearch.order = 'create_time desc,price desc';
              }
              vmCarFilter.getSearchResult(vmCarFilter.filterSearch.status);
          },
      }) ;
      vmCarFilter.onLoad();
      avalon.scan(document.body);
   });
});
