$('#distpicker').distpicker({
    autoSelect: false
});
$('#distpicker_two').distpicker({
    autoSelect: false
});
/*所需车型和所需司机的添加*/
$('.addItemOne').click(function () {
    var len= $('.carItem>ul').length;
    if(len<3){
        var html='<ul class="clearfix needCarItem mt35" style="margin-left:82px;">\n' +
            '<li class="dis_none">所需车型<span class="ml4 mr10">:</span></li>'+
            '                        <li>\n' +
            '                            <select>\n' +
            '                                <option value="">不限</option>\n' +
            '                                <option value="平板">平板</option>\n' +
            '                                <option value="高栏">高栏</option>\n' +
            '                                <option value="厢式">厢式</option>\n' +
            '                                <option value="集装箱">集装箱</option>\n' +
            '                                <option value="自卸">自卸</option>\n' +
            '                                <option value="冷藏">冷藏</option>\n' +
            '                                <option value="保温">保温</option>\n' +
            '                                <option value="高地板">高地板</option>\n' +
            '                                <option value="爬梯车">爬梯车</option>\n' +
            '                                <option value="飞翼车">飞翼车</option>\n' +
            '                            </select>\n' +
            '                            <label style="margin-left: 0px">类型</label>\n' +
            '                        </li>\n' +
            '                        <li class="mli35">\n' +
            '                            <select>\n' +
            '                                <option value="">不限</option>\n' +
            '                                <option value="1.8m">1.8米</option>\n' +
            '                                <option value="2.7m">2.7米</option>\n' +
            '                                <option value="3.8m">3.8米</option>\n' +
            '                                <option value="4.2m">4.2米</option>\n' +
            '                                <option value="5.0m">5.0米</option>\n' +
            '                                <option value="6.2m">6.2米</option>\n' +
            '                                <option value="6.8m">6.8米</option>\n' +
            '                                <option value="7.7m">7.7米</option>\n' +
            '                                <option value="8.2m">8.2米</option>\n' +
            '                                <option value="8.7m">8.7米</option>\n' +
            '                                <option value="9.6m">9.6米</option>\n' +
            '                                <option value="11.7m">11.7米</option>\n' +
            '                                <option value="12.5m">12.5米</option>\n' +
            '                                <option value="13.0m">13.0米</option>\n' +
            '                                <option value="15.0m">15.0米</option>\n' +
            '                                <option value="16.0m">16.0米</option>\n' +
            '                                <option value="17.5m">17.5米</option>\n' +
            '                            </select>\n' +
            '                            <label style="margin-left: 0px">车长</label>\n' +
            '                        </li>\n' +
            '                        <li>\n' +
            '                            <input type="text" placeholder="所需数量" />\n' +
            '                            <label style="margin-left: 0px">辆</label>\n' +
            '                        </li>\n' +
            '                        <li>\n' +
            '                            <input type="text"  placeholder="每辆价格" />\n' +
            '                            <label style="margin-left: 0px">元/天</label>\n' +
            '                        </li>\n' +
            '                        <li class="font24 addItemDel" style="margin-top: -7px;cursor:pointer;">-</li>\n' +
            '                    </ul>';
        $('.carItem').append(html);
    }else{
        alertMsg('最多可添加三个所需车型',2)
    }

});
$('.addItemTwo').click(function(){
    var len= $('.driverItem>ul').length;
    if(len<3){
        var html = '<ul class="clearfix needDriverItem mt35"  style="margin-left:82px;">\n' +
            '<li class="dis_none">所需司机<span class="ml4 mr10">:</span></li>'+
            '                        <li>\n' +
            '                            <select>\n' +
            '                                <option value="">不限</option>\n' +
            '                                <option value="A">A级</option>\n' +
            '                                <option value="B">B级</option>\n' +
            '                                <option value="C">C级</option>\n' +
            '                            </select>\n' +
            '                            <label style="margin-left:0px;">驾照</label>\n' +
            '                        </li>\n' +
            '                        <li class="mli35">\n' +
            '                            <input type="text" placeholder="所需司机数量" />\n' +
            '                            <label style="margin-left:0px;">人&emsp;</label>\n' +
            '                        </li>\n' +
            '                        <li>\n' +
            '                            <input type="text"  placeholder="每辆价格" />\n' +
            '                            <label style="margin-left:0px;">元/天</label>\n' +
            '                        </li>\n' +
            '                        <li class="font24 addItemTwoDel" style="margin-top: -7px;cursor:pointer;">-</li>\n' +
            '                    </ul>';
        $('.driverItem').append(html);
    }else{
        alertMsg('所需司机最多可以添加三个',2);
    }
});
$('.carItem').delegate('.addItemDel','click',function(){
   $(this).parent().remove();
});
$('.driverItem').delegate('.addItemTwoDel','click',function(){
    $(this).parent().remove();
});
layui.use('laydate', function() {
    var laydate = layui.laydate;
    //常规用法
    laydate.render({
        elem: '#test1'
    });
    laydate.render({
        elem: '#test2'
    });
});
$(function () {
    avalon.ready(function(){
       window.vmRentOrder = avalon.define({
           $id : 'root',
           postData:{
               '_token_':'',
               's_province':'',
               's_city':'',
               's_area':'',
               'e_province':'',
               'e_city':'',
               'e_area':'',
               'car':[],
               'chauffeur':[],
               'distance':'',
               'goods':'',
               's_time':'',
               'e_time':'',
               'remark':'',
               'contact':'',
               'tell':'',
               'code':'',
           },
           startAddress:{
               'province':'',
               'city':'',
               'area':''
           },
           endAddress:{
               'province':'',
               'city':'',
               'area':''
           },
           onLoad:function(){

           },
           /*获取验证码*/
           getCheckCode:function(){
               var phone = vmRentOrder.postData.tell;
               if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
                   alertMsg("请输入正确格式的手机号",2);
                   $('.btn-code').attr('disabled',true);
               }else{
                   var token  = localStorage.getItem('token');
                   var getCode = {
                       '_token_': token,
                       'mobile': vmRentOrder.postData.tell
                   };
                   getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                       if(res.code == 200){
                           alertMsg(res.message,1);
                       }else{
                           alertMsg(res.message,2);
                       }
                   });
                   let count = 60;
                   const countDown = setInterval(()=>{
                       if(count == 0){
                           $('.btn-code').text('获取验证码').removeAttr('disabled');
                           $('.btn-code').css({'background':'#999','cursor':'pointer'});
                           clearInterval(countDown);
                       }else{
                           $('.btn-code').attr('disabled',true);
                           $('.btn-code').css({'background':'#ff0000','cursor':'pointer'});
                           $('.btn-code').text('重新发送(' + count+')');
                       }
                       count--;
                   },1000);
               }
           },
           /*发布订单*/
           publishOrder:function(){
               /*装货地址和卸货地址*/
               vmRentOrder.postData._token_ = localStorage.getItem('token');
               vmRentOrder.postData.s_province = getProvince(vmRentOrder.startAddress.province);
               vmRentOrder.postData.s_city = getCode(vmRentOrder.startAddress.city);
               vmRentOrder.postData.s_area = getArea(vmRentOrder.startAddress.area);
               vmRentOrder.postData.e_province = getProvince(vmRentOrder.endAddress.province);
               vmRentOrder.postData.e_city = getCode(vmRentOrder.endAddress.city);
               vmRentOrder.postData.e_area = getArea(vmRentOrder.endAddress.area);
                /*所需车型*/
               var car = document.getElementsByClassName('needCarItem');
               var len = car.length;
               var carArr=[];
               for(var i=0;i<len;i++){
                   var carItem = {'type':car[i].children[1].children[0].value,'car_length':car[i].children[2].children[0].value,'num':car[i].children[3].children[0].value,'price':car[i].children[4].children[0].value}
                   carArr.push(carItem);
               }
               var driver = document.getElementsByClassName('needDriverItem');
               var len1 = driver.length;
               var driverArr = [];
               for(var j=0;j<len1;j++){
                   var driverItem={'type':driver[j].children[1].children[0].value,'num':driver[j].children[2].children[0].value,'price':driver[j].children[3].children[0].value};
                   driverArr.push(driverItem);
               }
               vmRentOrder.postData.car = carArr;
               vmRentOrder.postData.chauffeur=driverArr;
               console.log(vmRentOrder.postData)
               getAjax(API.URL_POST_LEASE,'post',vmRentOrder.postData).then(function(res){
                  if(res.code == 200){
                      alertMsg(res.message,1);
                  }else{
                      alertMsg(res.message,2);
                  }
               });
           },
           /*重置表单*/
           resetData:function(){
               /*省市区重置*/
               $('#distpicker').distpicker('reset', true);
               $('#distpicker_two').distpicker('reset', true);
               $('input[type="text"]').val('');
               $('textarea').val('');
           }
       });
        vmRentOrder.onLoad();
        avalon.scan(document.body);
    });
})
