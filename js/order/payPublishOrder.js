$('.payWay button').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});
$(function(){
   avalon.ready(function(){
       window.vmPayOrder = avalon.define({
          $id : 'root',
           getDetail:{
               '_token_':'',
               'order_id':''
           },
           startAddress:{},
           endAddress:{},
           orderInfo:{},
          onLoad:function(){
            vmPayOrder.getUrl();
          },
           // 货物运输查看详情
           checkDetail:function(el){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['1133px', '743px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/orderDetail.html']
               });
               localStorage.setItem('goods_checkId',el)
           },
           setActive:function(el){
               $('#'+el).find('.orderDes ul li:first-child').addClass('active');
           },
           removeActive:function(el){
               $('#'+el).find('.orderDes ul li:first-child').removeClass('active');
           },
           //重置
           resetData:function(){
               $('.payWay li button').removeClass('active');
               localStorage.setItem('payWay','');
           },
           /*提示设置支付密码*/
           payTip:function(){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['1127px', '639px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/payTip.html']
               });
           },
           //订单支付失败
           payFail:function(){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['883px', '432px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/payFailed.html']
               });
           },
           //订单支付成功
           paySuccess:function(){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['883px', '432px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/paySuccess.html']
               });
           },
           //选择抵用券
           chooseDiscount:function(all_money){
               top.layer.open({
                   type: 2,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['1024px', '639px'],
                   shadeClose: true, //开启遮罩关闭
                   content: ['/views/order/chooseDiscount.html']
               });
                localStorage.setItem('orderAllMoney',all_money);
           },
           payOrder:function(){
               var way = localStorage.getItem('payWay');
               if(way != null && way != ''){
                   top.layer.open({
                     type: 2,
                     title: false,
                     skin: 'layui-layer-demo', //样式类名
                     closeBtn: 1, //不显示关闭按钮
                     area: ['1127px', '639px'],
                     shadeClose: true, //开启遮罩关闭
                     content: ['/views/order/payOrder.html']
                   });
               }else{
                   alertMsg('请选择支付方式',2);
               }
           },
           getUrl:function(){
                var token = localStorage.getItem('token');
                var src = window.location.href;
                var url = GetRequest(src);
                vmPayOrder.getDetail._token_ = token;
                vmPayOrder.getDetail.order_id = url.goods_id;
                localStorage.setItem('goods_id',url.goods_id);
                vmPayOrder.getPayOrder();
           },
           getPayOrder:function(){
               getAjax(API.URL_GET_GOODSINFO,'get',vmPayOrder.getDetail).then(function(res){
                   if(res.code == 200){
                       var startC = res.result.start_address.city;
                       var startA = res.result.start_address.area;
                       var endC = res.result.end_address.city;
                       var endA = res.result.end_address.area;
                       res.result.start_address.city = getCityName(startC);
                       res.result.start_address.area = getAreaName(startA);
                       res.result.end_address.city = getCityName(endC);
                       res.result.end_address.area = getAreaName(endA);
                       /*图片*/
                       res.result.image = getApiHost + res.result.image;
                       vmPayOrder.orderInfo = res.result;
                       vmPayOrder.startAddress = res.result.start_address;
                       vmPayOrder.endAddress = res.result.end_address;
                       //满减的减多少
                       var less = localStorage.getItem('less');
                       if(less !='' && less != null){
                           var lessMoney = parseInt(less);
                           vmPayOrder.orderInfo.less = lessMoney;
                           vmPayOrder.orderInfo.disCountMoney = vmPayOrder.orderInfo.all_money - lessMoney;
                       }
                   }
               });
           },
           payWay:function (way) {
              localStorage.setItem('payWay',way);
           },

       });
       vmPayOrder.onLoad();
       avalon.scan(document.body);
   })
});