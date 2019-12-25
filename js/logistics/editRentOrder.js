$('#distpicker').distpicker({
    autoSelect: false
});
$('#distpicker_two').distpicker({
    autoSelect: false
});
/*所需车型和所需司机的添加*/
$('.carItem').delegate('.addItemOne','click',function(){
    var len= $('.carItem>ul').length;
    if(len<3){
        var html='<ul class="clearfix needCarItem mt35" style="margin-left:82px;"  data-id="">\n' +
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
        alertMsg('最多可添加三个所需车型',2);
    }
});
$('.driverItem').delegate('.addItemTwo','click',function(){
    var len= $('.driverItem>ul').length;
    if(len<3){
        var html = '<ul class="clearfix needDriverItem mt35"  style="margin-left:82px;" data-id="">\n' +
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
        window.vmEditRentOrder = avalon.define({
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
                'id':''
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
            token:'',
            rentInfo:'',
            onLoad:function(){
                vmEditRentOrder.getParam();
            },
            getParam:function(){
                var url = window.location.href;
                var params = GetRequest(url);
                vmEditRentOrder.postData.id = params.id;
                var token = localStorage.getItem('token');
                vmEditRentOrder.token = token;
                vmEditRentOrder.getRentDetail();
            },
            /*获取租赁订单详情*/
            getRentDetail:function(){
                getAjax(API.URL_GET_LEASEINFO,'get',{'_token_':vmEditRentOrder.token,'lease_id':vmEditRentOrder.postData.id}).then(function(res){
                   if(res.code == 200){
                       $(" #province1 option[data-code ='" + res.result.s_province + "']").attr("selected", "selected");
                       $("#province1").trigger("change");
                       $(" #city1 option[data-code ='" + res.result.s_city + "']").attr("selected", "selected");
                       $("#city1").trigger("change");
                       $(" #district1 option[data-code ='" + res.result.s_area + "']").attr("selected", "selected");
                       $("#district1").trigger("change");
                       $(" #province1_two option[data-code ='" + res.result.e_province + "']").attr("selected", "selected");
                       $("#province1_two").trigger("change");
                       $(" #city1_two option[data-code ='" + res.result.e_city + "']").attr("selected", "selected");
                       $("#city1_two").trigger("change");
                       $(" #district1_two option[data-code ='" + res.result.e_area + "']").attr("selected", "selected");
                       $("#district1_two").trigger("change");
                       vmEditRentOrder.startAddress.province = getProvinceName(res.result.s_province);
                       vmEditRentOrder.startAddress.city = getCityName(res.result.s_city);
                       vmEditRentOrder.startAddress.area = getAreaName(res.result.s_area);
                       vmEditRentOrder.endAddress.province = getProvinceName(res.result.e_province);
                       vmEditRentOrder.endAddress.city = getCityName(res.result.e_city);
                       vmEditRentOrder.endAddress.area = getAreaName(res.result.e_area);
                       vmEditRentOrder.rentInfo = res.result;
                       vmEditRentOrder.postData.distance = res.result.distance;
                       vmEditRentOrder.postData.goods = res.result.goods;
                       vmEditRentOrder.postData.s_time = res.result.s_time;
                       vmEditRentOrder.postData.e_time = res.result.e_time;
                       vmEditRentOrder.postData.remark = res.result.remark;
                       vmEditRentOrder.postData.tell = res.result.tell;
                       vmEditRentOrder.postData.contact = res.result.contact;
                   }else{
                       let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                       let code =  res.code;
                       if(tokenCode.indexOf(code) >= 0){
                           getToken();
                           vmEditRentOrder.onLoad();
                       }else{
                           alertMsg(res.message,2);
                       }
                   }
                });
            },
            /*获取验证码*/
            getCheckCode:function(){
                var phone = vmEditRentOrder.postData.tell;
                if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
                    alertMsg("请输入正确格式的手机号",2);
                    $('.btn-code').attr('disabled',true);
                }else{
                    var token  = localStorage.getItem('token');
                    var getCode = {
                        '_token_': token,
                        'mobile': vmEditRentOrder.postData.tell
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
                vmEditRentOrder.postData._token_ = localStorage.getItem('token');
                vmEditRentOrder.postData.s_province = getProvince(vmEditRentOrder.startAddress.province);
                vmEditRentOrder.postData.s_city = getCode(vmEditRentOrder.startAddress.city);
                vmEditRentOrder.postData.s_area = getArea(vmEditRentOrder.startAddress.area);
                vmEditRentOrder.postData.e_province = getProvince(vmEditRentOrder.endAddress.province);
                vmEditRentOrder.postData.e_city = getCode(vmEditRentOrder.endAddress.city);
                vmEditRentOrder.postData.e_area = getArea(vmEditRentOrder.endAddress.area);
                /*所需车型*/
                var car = document.getElementsByClassName('needCarItem');
                console.log(car)
                var len = car.length;
                var carArr=[];
                for(var i=0;i<len;i++){
                    var carItem = {'type':car[i].children[1].children[0].value,'car_length':car[i].children[2].children[0].value,'num':car[i].children[3].children[0].value,'price':car[i].children[4].children[0].value,'id':car[i].dataset.id}
                    carArr.push(carItem);
                }
                var driver = document.getElementsByClassName('needDriverItem');
                var len1 = driver.length;
                var driverArr = [];
                for(var j=0;j<len1;j++){
                    var driverItem={'type':driver[j].children[1].children[0].value,'num':driver[j].children[2].children[0].value,'price':driver[j].children[3].children[0].value,'id':driver[j].dataset.id};
                    driverArr.push(driverItem);
                }
                vmEditRentOrder.postData.car = carArr;
                vmEditRentOrder.postData.chauffeur=driverArr;
                console.log(vmEditRentOrder.postData)
                getAjax(API.URL_POST_EDITLEASE,'post',vmEditRentOrder.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
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
        vmEditRentOrder.onLoad();
        avalon.scan(document.body);
    });
})
