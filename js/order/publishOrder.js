$('#distpicker').distpicker({
   autoSelect:false
});
$('#distpicker_two').distpicker({
    autoSelect:false
});
$('#distpicker_three').distpicker({
   autoSelect:false
});
$('#distpicker_four').distpicker({
    autoSelect:false
});
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
                var html = '<li class="delItem"><img src="'+ getApiHost + res.result.crop +'" data-src="' + res.result.crop +'" class="img_upload"  width="86px" height="86px" alt=""><span class="del">X</span></li>';
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
/*图片删除*/
$(".imgItem").delegate(".delItem .del","click",function(){
    $(this).parent().remove();
});
function changeCount(item){
    $(item).delegate('.addressAdd','click',function () {
        var text = $(this).text();
        if(text == '+'){
            var flag = $(this).closest('.form-inline').is(':hidden');
            if(!flag){
                $(this).closest('.form-inline').siblings().show(200);
                $(this).html('<img src="../../images/delete_icon.svg" class="delAddress" />');
            }
        }
    });
}
$('.loadAddress .addressAdd').click(function () {
    var html = '';
})
changeCount('.loadAddress');
changeCount('.unloadAddress');
function deleteItem(item_one,item_two){
    $(item_one).delegate('.delAddress','click',function () {
        var one_hidden = $(item_two).is(':hidden');
        var two_hidden = $(item_two).is(':hidden');
        if(!one_hidden && !two_hidden){
            $(this).closest('.form-inline').hide();
            $(this).closest('.form-inline').siblings().find('.addressAdd').text('+');
        }
    });
}
deleteItem('.loadAddress','.loadAddress .addressItem_one');
deleteItem('.unloadAddress','.loadAddress .addressItem_three');
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmPublishOrder.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
};
$(function(){
    $('.demo').ySelect();
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        //常规用法
        laydate.render({
            elem: '#test1'
        });
    });
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
                'time':'00:00:00 - 23:59:59'
           },
           goodsInfo:{},
           start:[],
           end:[],
           /*重置*/
           resetData:function(){
               $('#distpicker').distpicker('reset', true);
               $('#distpicker_two').distpicker('reset',true);
               $('#distpicker_three').distpicker('reset',true);
               $('#distpicker_four').distpicker('reset',true);
               $('.demo').ySelect();
               $('input[type="text"]').val('');
               $('textarea').val('');
               var urgent = document.getElementsByName("urgent");
               for(var i=0;i<urgent.length;i++){
                   urgent[i].checked = false;
               };
               vmPublishOrder.postData.car_length = '';
               vmPublishOrder.postData.car_model = '';
               vmPublishOrder.postData.weight='';
               vmPublishOrder.postData.volume='';
               vmPublishOrder.date.date = '';
               vmPublishOrder.date.time = '';
               $('.delItem').remove();
           },
           /*下一步*/
           nextStep:function () {
                vmPublishOrder.postData._token_ = localStorage.getItem('token');
                var carModel = $("#m1").ySelectedValues(",");
                if(carModel == ''){
                    alertMsg('请选择车型',2);
                    return false;
                }else{
                    var len = carModel.split(',').length;
                    if(len > 3){
                        alertMsg('最多可以选择3个车型',2);
                        return false;
                    }else{
                        vmPublishOrder.postData.car_model = carModel;
                    }
                }
                var carLength = $("#m2").ySelectedValues(",");
               if(carLength == 0){
                   alertMsg('请选择车长',2);
                   return false;
               }else{
                   var len = carLength.split(',').length;
                   if(len > 3){
                       alertMsg('最多可以选择3个车长',2);
                       return false;
                   }else{
                       vmPublishOrder.postData.car_length = carLength;
                   }
               };
               /*地址*/
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
               /*判断地址的显示与隐藏,取显示的地址的值*/
               var one_hidden = $('.addressItem_one').is(':hidden');
               var two_hidden = $('.addressItem_two').is(':hidden');
               var three_hidden = $('.addressItem_three').is(':hidden');
               var four_hidden = $('.addressItem_four').is(':hidden');
               if(!one_hidden){
                   obj_one.province = getProvince(vmPublishOrder.model.addressList_one.province);
                   obj_one.city = getCode(vmPublishOrder.model.addressList_one.city);
                   obj_one.area = getArea(vmPublishOrder.model.addressList_one.area);
                   obj_one.address = vmPublishOrder.model.addressList_one.address;
                   vmPublishOrder.postData.adList.push(obj_one);
               }
               if(!two_hidden){
                   obj_two.province = getProvince(vmPublishOrder.model.addressList_two.province);
                   obj_two.city = getCode(vmPublishOrder.model.addressList_two.city);
                   obj_two.area = getArea(vmPublishOrder.model.addressList_two.area);
                   obj_two.address = vmPublishOrder.model.addressList_two.address;
                   vmPublishOrder.postData.adList.push(obj_two);
               }
               if(!three_hidden){
                   obj_three.province = getProvince(vmPublishOrder.model.addressList_three.province);
                   obj_three.city = getCode(vmPublishOrder.model.addressList_three.city);
                   obj_three.area = getArea(vmPublishOrder.model.addressList_three.area);
                   obj_three.address = vmPublishOrder.model.addressList_three.address;
                   vmPublishOrder.postData.adList.push(obj_three);
               }
               if(!four_hidden){
                   obj_four.province = getProvince(vmPublishOrder.model.addressList_four.province);
                   obj_four.city = getCode(vmPublishOrder.model.addressList_four.city);
                   obj_four.area = getArea(vmPublishOrder.model.addressList_four.area);
                   obj_four.address = vmPublishOrder.model.addressList_four.address;
                   vmPublishOrder.postData.adList.push(obj_four);
               }
               //是否加急的选择
               var urgent = document.getElementsByName("urgent");
               for(var i=0;i<urgent.length;i++){
                   if(urgent[i].checked){
                       if(urgent[i].value == 'yes'){
                           vmPublishOrder.postData.expedited = '10';
                       }else{
                           vmPublishOrder.postData.expedited = '20';
                       }
                   }
               }
               //装货时间
               vmPublishOrder.postData.loading_start_time =  vmPublishOrder.date.date +' '+vmPublishOrder.date.time.substr(0,8);
               vmPublishOrder.postData.loading_end_time = vmPublishOrder.date.date +' '+vmPublishOrder.date.time.substr(11);
               //图片
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
                    console.log(vmPublishOrder.postData)
                    getAjax(API.URL_POST_GOODSSHIP,'post',vmPublishOrder.postData).then(function(res){
                        if(res.code == 200){
                            alertMsg(res.message,1);
                            location.href='./payPublishOrder.html?goods_id='+res.result.goods_id;
                        }else{
                            checkToken(res);
                        }
                    });
               }else{
                   alertMsg('请上传货物图片',2);
               }
           }
       });
       vmPublishOrder.onLoad();
       avalon.scan(document.body);
    });
});
