$('.payWay button').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});
$(document).ready(function(){
    $("#box input").eq(0).focus();
    $("#box input").keyup(function(){
        if(!parseInt($(this).val())){
            $(this).val('');
            return false;
        }
        if(parseInt($(this).index())+1<=$("#box input").length){
            $(this).blur();
            if(parseInt($(this).index())+1<=$("#box input").length){
                $(this).next('input').focus();
            }
        }
    });
});
var _formPay = $('#form_paypsw');

_formPay.validate({
    rules : {
        'payPassword_rsainput':{
            'minlength':6,
            'maxlength':6,
            required:true,
            digits : true,
            numPassword : true,
            echoNum :true
        }
    },

    messages:{
        'payPassword_rsainput':{
            'required' : '<i class="icon icon-attention icon-lg"></i>&nbsp;请填写支付密码',
            'maxlength' : '<i class="icon icon-attention icon-lg"></i>&nbsp;密码最多为{0}个字符',
            'minlength' : '<i class="icon icon-attention icon-lg"></i>&nbsp;密码最少为{0}个字符',
            'digits':'<i class="icon icon-attention icon-lg"></i>&nbsp;密码只能为数字',
            'numPassword' : '<i class="icon icon-attention icon-lg"></i>&nbsp;连号不可用，相同数字不可用（如：123456，11111）',
            'echoNum' :'<i class="icon icon-attention icon-lg"></i>&nbsp;连号不可用，相同数字不可用（如：123456，11111）'
        }
    },
    errorPlacement : function(error, element) {
        element.closest('div[data-error="i_error"]').append(error);
    },
    submitHandler : function(form){
        var _form = $(form);
        form.submit();

    }
});

var payPassword = $("#payPassword_container"),
    _this = payPassword.find('i'),
    k=0,j=0,
    password = '' ,
    _cardwrap = $('#cardwrap');
//点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
payPassword.on('focus',"input[name='payPassword_rsainput']",function(){

    var _this = payPassword.find('i');
    if(payPassword.attr('data-busy') === '0'){
        //在第一个密码框中添加光标样式
        _this.eq(k).addClass("active");
        _cardwrap.css('visibility','visible');
        payPassword.attr('data-busy','1');
    }

});
//change时去除输入框的高亮，用户再次输入密码时需再次点击
payPassword.on('change',"input[name='payPassword_rsainput']",function(){
    _cardwrap.css('visibility','hidden');
    _this.eq(k).removeClass("active");
    payPassword.attr('data-busy','0');
}).on('blur',"input[name='payPassword_rsainput']",function(){

    _cardwrap.css('visibility','hidden');
    _this.eq(k).removeClass("active");
    payPassword.attr('data-busy','0');

});

//使用keyup事件，绑定键盘上的数字按键和backspace按键
payPassword.on('keyup',"input[name='payPassword_rsainput']",function(e){

    var  e = (e) ? e : window.event;

    //键盘上的数字键按下才可以输入
    if(e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
        k = this.value.length;//输入框里面的密码长度
        l = _this.length;//6

        for(;l--;){

            //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
            if(l === k){
                _this.eq(l).addClass("active");
                _this.eq(l).find('b').css('visibility','hidden');

            }else{
                _this.eq(l).removeClass("active");
                _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');

            }

            if(k === 6){
                j = 5;
            }else{
                j = k;
            }
            $('#cardwrap').css('left',j*55+'px');
        }
    }else{
        //输入其他字符，直接清空
        var _val = this.value;
        this.value = _val.replace(/\D/g,'');
    }
});
$(function(){
   avalon.ready(function(){
       window.vmPayOrder = avalon.define({
          $id : 'root',
           getDetail:{
               '_token_':'',
               'order_id':''
           },
           payData:{
               '_token_':'',
               'type':'',
               'coupon_id':'',
               'goods_id':'',
               'pay_password':''
           },
           way:'',
           less:'',
           startAddress:{},
           endAddress:{},
           orderInfo:{},
           couponList:[],
          onLoad:function(){
            vmPayOrder.getUrl();

            localStorage.setItem('coupon_id','');
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
           //选择抵用券(弹窗)
           chooseDiscount:function(el){
               top.layer.open({
                   type: 1,
                   title: false,
                   skin: 'layui-layer-demo', //样式类名
                   closeBtn: 1, //不显示关闭按钮
                   area: ['1024px', '639px'],
                   shadeClose: true, //开启遮罩关闭
                   content: $('#chooseDiscount'),
                   cancel: function(){
                       $("#chooseDiscount").css({'display':'none'});
                       parent.layer.close(parent.layer.index);
                   }
               });
           },
           //点击去支付
           payOrder:function(){
               if(vmPayOrder.way != null && vmPayOrder.way != ''){
                   $('#pay').show();
                   top.layer.open({
                     type: 1,
                     title: false,
                     skin: 'layui-layer-demo', //样式类名
                     closeBtn: 1, //不显示关闭按钮
                     area: ['1127px', '639px'],
                     shadeClose: true, //开启遮罩关闭
                     content:  $('.payMoney'),
                     cancel: function(){
                         $(".payMoney").css({'display':'none'});
                         parent.layer.close(parent.layer.index);
                     }
                   });
               }else{
                   alertMsg('请选择支付方式',2);
               }
           },
           //获取订单id
           getUrl:function(){
                var token = localStorage.getItem('token');
                var src = window.location.href;
                var url = GetRequest(src);
                vmPayOrder.getDetail._token_ = token;
                vmPayOrder.payData._token_ = token;
                vmPayOrder.getDetail.order_id = url.goods_id;
                vmPayOrder.payData.goods_id = url.goods_id;
                localStorage.setItem('goods_id',url.goods_id);
                vmPayOrder.getPayOrder();
           },
           //获取要支付的订单
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
                       vmPayOrder.getCouponList();
                   }else{
                        alertMsg(res.message,2);
                   }
               });
           },
           //选择支付方式
           payWay:function (way) {
               vmPayOrder.way = way;
               vmPayOrder.payData.type = way;
               localStorage.setItem('payWay',way);
           },
           //支付弹窗的取消
           cancel:function(){
               $('#pay').hide();
               parent.layer.close(parent.layer.index);
           },
           //输入密码进行支付
           payMoney:function () {
               getAjax(API.URL_POST_GOODSPAY,'post',vmPayOrder.payData).then(function(res){
                   if(res.code == 200){
                       alertMsg(res.message,1);
                       setTimeout(function(){
                           parent.layer.close(parent.layer.index);
                       },1000)
                   }else{
                       alertMsg(res.message,2);
                   }
               });
           },
           //选择优惠券弹窗
           //取消选择
           chooseCancel:function(){
               vmPayOrder.payData.coupon_id = '';
               vmPayOrder.less = '';
               parent.layer.close(parent.layer.index);
           },
           //优惠券选中
           selectCoupon:function(){
               var id = vmPayOrder.payData.coupon_id;
               if(id !="" && id !=null){
                   $('#discount_'+id).find('.selected').show();
               }
           },
           //优惠券点击确定
           confirm:function(){
               $('#chooseDiscount').css({'display':'none'});
               parent.layer.close(parent.layer.index);
               //满减的减多少
               var less = vmPayOrder.less;
               if(less !='' && less != null){
                   var lessMoney = parseInt(less);
                   vmPayOrder.orderInfo.all_money = vmPayOrder.orderInfo.all_money - lessMoney;
               }
           },
           //选择优惠券
           chooseCoupon:function(el,id,less){
               var flag = $('#discount_'+id).find('.selected').is(':hidden');
               if(!flag){
                   $('#discount_'+id).find('.selected').hide();
               }else{
                   $('#discount_'+id).find('.selected').show();
               }
               vmPayOrder.payData.coupon_id = id;
               vmPayOrder.less = less;
           },
           //优惠券列表
           getCouponList:function () {
               var token = localStorage.getItem('token');
               getAjax(API.URL_GET_COUPONLIST,'get',{'_token_':token,'status':'10'}).then(function(res){
                   if(res.code == 200){
                       for(var i in res.result){
                           if(res.result[i].type == '10'){
                               res.result[i].allMoney = vmPayOrder.orderInfo.all_money;
                               vmPayOrder.couponList.push(res.result[i]);
                           }
                       }
                       vmPayOrder.selectCoupon();
                   }else{
                       alertMsg(res.message,2);
                   }
               });
           },
       });
       vmPayOrder.onLoad();
       avalon.scan(document.body);
   })
});