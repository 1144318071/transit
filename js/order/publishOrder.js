layui.use('upload', function () {
    var token = localStorage.getItem('token');
    $ = layui.$;
    upload = layui.upload;
    $.ajaxSetup({
        // 发送cookie
        xhrFields: {
            withCredentials: true
        },
    });
    upload.render({
        elem: '#test2',
        url: API.URL_POST_UPLOADFILE,
        data: {
            "_token_": token,
        },
        done: function (res) {
            if(res.code === 200){
                alertMsg(res.message,1);
                var html = '<li><img src="'+ getApiHost + res.result.crop +'" data-src="' + res.result.crop +'" class="img_upload"  width="86px" height="86px" alt=""></li>';
                $('.imgItem').append(html);
                var imgLength = document.getElementsByClassName('img_upload').length;
                if(imgLength == 6){
                    $('#test2').attr('disabled',true);
                }
            }else{
                alertMsg(res.message,2);
            }
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
});
$('.upload').hover(function () {
    $(this).find('.uploadimg').show();
}, function () {
    $(this).find('.uploadimg').hide();
});
$('.payWay button').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});
//下一步
$('.btn-next').click(function(){
     $('.formTitle').hide();
    $('.form').hide();
    $('.orderDetail').show();
});
function isShow(item_one,item_two){
    $(item_one).click(function () {
        var flag = $(item_two).is(':hidden');
        if(flag){
            $(item_two).show(200);
            $(item_one).text('-');
        }else{
            $(item_two).hide(100);
            $(item_one).text('+');
        }
    });
};
isShow('.addressItem_one .addressAdd','.addressItem_two');
isShow('.addressItem_three .addressAdd','.addressItem_four')
$(function(){
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        //常规用法
        laydate.render({
            elem: '#test1'
        });
    });
    $('#distpicker').distpicker('reset', true);
    $('#distpicker_two').distpicker('reset',true);
    $('#distpicker_three').distpicker('reset',true);
    $('#distpicker_four').distpicker('reset',true);
    avalon.ready(function(){
       window.vmPublishOrder = avalon.define({
            $id : 'root',
           onLoad:function(){
           },
           imgLength:'',
           model:{
               addressList_one:{
                   'province':'',
                   'city':'',
                   'area':'',
                   'address':'',
               },
               addressList_two:{
                   'province':'',
                   'city':'',
                   'area':'',
                   'address':'',
               },
               addressList_three:{
                   'province':'',
                   'city':'',
                   'area':'',
                   'address':'',
               },
               addressList_four:{
                   'province':'',
                   'city':'',
                   'area':'',
                   'address':'',
               },
           },
           postData:{
               '_token_':'',
               'type':'10',
               'car_length':'',
               'car_model':'',
               'weight':'',
               'volume':'',
               'goods_type':'',
               'expedited':'',
               'loading_start_time':'',
               'loading_end_time':'',
               'goods_images':'',
               'remark':'',
               'adList':[],
           },
           date:{
                'date':'',
                'time':''
           },
           getDetail:{
                '_token_':'',
                'order_id':''
           },
           orderInfo:{},
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
           nextStep:function () {
               vmPublishOrder.postData._token_ = localStorage.getItem('token');
               vmPublishOrder.getDetail._token_ = vmPublishOrder.postData._token_;
               var imgArr = document.getElementsByClassName('img_upload');
               var imgLength = imgArr.length;
               var imgs =[];
               if(imgLength > 0){
                   //获取图片地址
                    for(var j=0;j<imgArr.length;j++){
                        var src = $(imgArr[j]).attr('data-src')
                        imgs.push(src)
                    }
                   vmPublishOrder.postData.goods_images = imgs.join(',');
                    //装货地址以及卸货地址
                   vmPublishOrder.postData.adList=[];
                   var obj_one = {
                       'province':'',
                       'city':'',
                       'area':'',
                       'address':'',
                       'start':'1',
                       'end':'2'
                   };
                   var obj_two={
                       'province':'',
                       'city':'',
                       'area':'',
                       'address':'',
                       'start':'1',
                       'end':'2'
                   };
                   var obj_three = {
                       'province':'',
                       'city':'',
                       'area':'',
                       'address':'',
                       'start':'2',
                       'end':'1'
                   };
                   var obj_four = {
                       'province':'',
                       'city':'',
                       'area':'',
                       'address':'',
                       'start':'2',
                       'end':'1'
                   };
                   obj_one.province = $("#province1 option[value =" + vmPublishOrder.model.addressList_one.province + "]").attr('data-code');
                   obj_one.city = $("#city1 option[value =" + vmPublishOrder.model.addressList_one.city + "]").attr('data-code');
                   obj_one.area= $("#district1 option[value =" + vmPublishOrder.model.addressList_one.area + "]").attr('data-code');
                   obj_one.address = vmPublishOrder.model.addressList_one.address;
                   vmPublishOrder.postData.adList.push(obj_one);
                   obj_three.province= $("#province1_three option[value =" + vmPublishOrder.model.addressList_three.province + "]").attr('data-code');
                   obj_three.city = $("#city1_three option[value =" + vmPublishOrder.model.addressList_three.city + "]").attr('data-code');
                   obj_three.area = $("#district1_three option[value =" + vmPublishOrder.model.addressList_three.area + "]").attr('data-code');
                   obj_three.address = vmPublishOrder.model.addressList_three.address;
                   vmPublishOrder.postData.adList.push(obj_three);
                   if(vmPublishOrder.model.addressList_two.province != ''){
                       obj_two.province = $("#province1_two option[value =" + vmPublishOrder.model.addressList_two.province + "]").attr('data-code');
                       obj_two.city = $("#city1_two option[value =" + vmPublishOrder.model.addressList_two.city + "]").attr('data-code');
                       obj_two.area = $("#district1_two option[value =" + vmPublishOrder.model.addressList_two.area + "]").attr('data-code');
                       obj_two.address = vmPublishOrder.model.addressList_two.address;
                       vmPublishOrder.postData.adList.push(obj_two);
                   }
                   if(vmPublishOrder.model.addressList_four.province != ''){
                       obj_four.province = $("#province1_four option[value =" + vmPublishOrder.model.addressList_four.province + "]").attr('data-code');
                       obj_four.city = $("#city1_four option[value =" + vmPublishOrder.model.addressList_four.city + "]").attr('data-code');
                       obj_four.area = $("#district1_four option[value =" + vmPublishOrder.model.addressList_four.area + "]").attr('data-code');
                       obj_four.address = vmPublishOrder.model.addressList_four.address;
                       vmPublishOrder.postData.adList.push(obj_four);
                   }
                   //是否加急的选择
                   var urgent = document.getElementsByName("urgent");
                   for(var i=0;i<urgent.length;i++){
                       if(urgent[i].checked){
                           vmPublishOrder.postData.expedited = urgent[i].value;
                       }
                   }
                   vmPublishOrder.postData.loading_start_time =  vmPublishOrder.date.date +' '+vmPublishOrder.date.time.substr(0,8);
                   vmPublishOrder.postData.loading_end_time = vmPublishOrder.date.date +' '+vmPublishOrder.date.time.substr(11);
                    getAjax(API.URL_POST_GOODSSHIP,'post',vmPublishOrder.postData).then(function(res){
                        if(res.code == 200){
                            vmPublishOrder.getDetail.order_id = res.result.goods_id;
                            alertMsg(res.message,1);
                            getAjax(API.URL_GET_GOODSINFO,'get',vmPublishOrder.getDetail).then(function(res){
                                if(res.code == 200){
                                    var startC = res.result.start_address.city;
                                    var startA = res.result.start_address.area;
                                    var endC = res.result.end_address.city;
                                    var endA = res.result.end_address.area;
                                    res.result.start_address.city = getCityName(startC);
                                    res.result.start_address.area = getAreaName(startA);
                                    res.result.end_address.city = getCityName(endC);
                                    res.result.end_address.area = getAreaName(endA);
                                    vmPublishOrder.orderInfo = res.result;
                                    console.log(res.result)
                                    $('.formTitle').hide();
                                    $('.form').hide();
                                    $('.orderDetail').show();
                                }
                            });
                        }else{
                            alertMsg(res.message,2);
                        }
                    });
               }else{
                   alertMsg('请上传货物图片');
               }
           }
       });
       vmPublishOrder.onLoad();
       avalon.scan(document.body);
    });
});
