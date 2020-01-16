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
changeCount('.loadAddress');
changeCount('.unloadAddress');
function deleteItem(item_one,item_two,item_three){
    $(item_one).delegate('.delAddress','click',function () {
        $(this).parent().parent().parent().distpicker('reset', true);
        var one_hidden = $(item_two).is(':hidden');
        var two_hidden = $(item_three).is(':hidden');
        if(!one_hidden && !two_hidden){
            $(this).closest('.form-inline').hide();
            $(this).closest('.form-inline').siblings().find('.addressAdd').text('+');
        }
        if(item_one == '.loadAddress'){
           if(!one_hidden){
               vmEditOrder.model.addressList_one.id='';
           }else if(!two_hidden){
               vmEditOrder.model.addressList_two.id='';
           }
        }else if(item_one == '.unloadAddress'){
            if(one_hidden){
                vmEditOrder.model.addressList_three.id='';
            }else if(!two_hidden){
                vmEditOrder.model.addressList_four.id='';
            }
        }
    });
}
deleteItem('.loadAddress','.loadAddress .addressItem_one','.loadAddress .addressItem_two');
deleteItem('.unloadAddress','.unloadAddress .addressItem_three','.unloadAddress .addressItem_four');
// 公共方法
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) < 0) {
        if(loginCode.indexOf(code)>=0){
            alertMsg(res.message,2);
            window.location.href='../../login.html';
        }else{
            alertMsg(res.message,2);
        }
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
        window.vmEditOrder = avalon.define({
            $id : 'root',
            onLoad:function(){
                vmEditOrder.getOrderDetail();
            },
            imgLength:'',
            model:{
                addressList_one:{
                    'province':'',
                    'city':'',
                    'area':'',
                    'address':'',
                    'start':'1',
                    'end':'2',
                    'id':''
                },
                addressList_two:{
                    'province':'',
                    'city':'',
                    'area':'',
                    'address':'',
                    'start':'1',
                    'end':'2',
                    'id':''
                },
                addressList_three:{
                    'province':'',
                    'city':'',
                    'area':'',
                    'address':'',
                    'start':'2',
                    'end':'1',
                    'id':''
                },
                addressList_four:{
                    'province':'',
                    'city':'',
                    'area':'',
                    'address':'',
                    'start':'2',
                    'end':'1',
                    'id':''
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
                'goods_id':'',
                'adList':[],
            },
            date:{
                'date':'',
                'time':''
            },
            goodsInfo:{},
            start:[],
            end:[],
            goods_id:'',
            car_model:'',
            car_length:'',
            //获取get传参的数据
            getOrderDetail:function(){
                var src = window.location.href;
                var params = GetRequest(src).goods_id;
                vmEditOrder.goods_id = params;
                vmEditOrder.postData.goods_id = params;
                var token = localStorage.getItem('token');
                var postData = {
                    '_token_':token,
                    'order_id':params
                };
                getAjax(API.URL_GET_GOODSINFO,'get',postData).then(function(res){
                    if(res.code == 200){
                        var model = res.result.car_model.split(',');
                        var len = res.result.car_length.split(',');
                        var selected = model +',' +  len;
                        var selectedArr = selected.split(',');
                        $('.carTypeSelected .fs-label').text(res.result.car_model);
                        $('.carLengthSelected .fs-label').text(res.result.car_length);
                        $('.fs-options .fs-option').each(function(i,val){
                            var txt = $(val).attr('data-value');
                            for(var i in selectedArr){
                                if(selectedArr[i] == txt){
                                    $(val).addClass('selected');
                                }
                            }
                        });
                        vmEditOrder.car_model = res.result.car_model;
                        vmEditOrder.car_length = res.result.car_length;
                        /*数据渲染*/
                        /*时间的处理*/
                        var start_time = res.result.loading_start_time;
                        var end_time = res.result.loading_end_time;
                        vmEditOrder.date.date = start_time.substr(0,10);
                        vmEditOrder.date.time = start_time.substr(11)+' - '+end_time.substr(11);
                        /*货物重量*/
                        vmEditOrder.postData.weight = res.result.weight;
                        vmEditOrder.postData.volume = res.result.volume;
                        /*货物类型*/
                        vmEditOrder.postData.goods_type = res.result.goods_type;
                        /*没有任何操作的时候,其值与获取的值是一样的*/
                        vmEditOrder.postData.loading_start_time = res.result.loading_start_time;
                        vmEditOrder.postData.loading_end_time = res.result.loading_end_time;
                        vmEditOrder.postData.goods_images = res.result.goods_images;
                        vmEditOrder.postData.remark = res.result.remark;
                        vmEditOrder.postData.expedited = res.result.expedited;
                        let detailAddress = res.result.line;
                        let start = [];
                        let end=[];
                        vmEditOrder.start = start;
                        vmEditOrder.end = end;
                        for(let i in detailAddress){
                            if(detailAddress[i].start == '1'){
                                start.push(detailAddress[i])
                            }else{
                                end.push(detailAddress[i]);
                            }
                        }
                        let start_len = start.length;
                        let end_len = end.length;
                        /*装货地址*/
                        switch(start_len){
                            case 1:
                                $(" #province1 option[data-code ='" + start[0].province + "']").attr("selected", "selected");
                                $("#province1").trigger("change");
                                $(" #city1 option[data-code ='" + start[0].city + "']").attr("selected", "selected");
                                $("#city1").trigger("change");
                                $(" #district1 option[data-code ='" + start[0].area + "']").attr("selected", "selected");
                                $("#district1").trigger("change");
                                vmEditOrder.model.addressList_one.province=getProvinceName(start[0].province);
                                vmEditOrder.model.addressList_one.city=getCityName(start[0].city);
                                vmEditOrder.model.addressList_one.area=getAreaName(start[0].area);
                                vmEditOrder.model.addressList_one.address = start[0].address;
                                vmEditOrder.model.addressList_one.id = start[0].id;
                                console.log(start[0].province,start[0].city,start[0].area)
                            break;
                            case 2:
                                $('.addressItem_two').show();
                                $('.loadAddress .addressAdd').html('<img src="../../images/delete_icon.svg" class="delAddress" />');
                                $(" #province1 option[data-code ='" + start[0].province + "']").attr("selected", "selected");
                                $("#province1").trigger("change");
                                $(" #city1 option[data-code ='" + start[0].city + "']").attr("selected", "selected");
                                $("#city1").trigger("change");
                                $(" #district1 option[data-code ='" + start[0].area + "']").attr("selected", "selected");
                                $("#district1").trigger("change");
                                $(" #province1_two option[data-code ='" + start[1].province + "']").attr("selected", "selected");
                                $("#province1_two").trigger("change");
                                $(" #city1_two option[data-code ='" + start[1].city + "']").attr("selected", "selected");
                                $("#city1_two").trigger("change");
                                $(" #district1_two option[data-code ='" + start[1].area + "']").attr("selected", "selected");
                                $("#district1_two").trigger("change");
                                vmEditOrder.model.addressList_one.province=getProvinceName(start[0].province);
                                vmEditOrder.model.addressList_one.city=getCityName(start[0].city);
                                vmEditOrder.model.addressList_one.area=getAreaName(start[0].area);
                                vmEditOrder.model.addressList_one.id = start[0].id;
                                vmEditOrder.model.addressList_one.address = start[0].address;
                                vmEditOrder.model.addressList_two.province=getProvinceName(start[1].province);
                                vmEditOrder.model.addressList_two.city=getCityName(start[1].city);
                                vmEditOrder.model.addressList_two.area=getAreaName(start[1].area);
                                vmEditOrder.model.addressList_two.id = start[1].id;
                                vmEditOrder.model.addressList_two.address=start[1].address;
                            break;
                            default:
                            break;
                        }
                        /*卸货地址*/
                        switch(end_len){
                            case 1:
                                $(" #province1_three option[data-code ='" + end[0].province + "']").attr("selected", "selected");
                                $("#province1_three").trigger("change");
                                $(" #city1_three option[data-code ='" + end[0].city + "']").attr("selected", "selected");
                                $("#city1_three").trigger("change");
                                $(" #district1_three option[data-code ='" + end[0].area + "']").attr("selected", "selected");
                                $("#district1_three").trigger("change");
                                console.log(end[0].province,end[0].city,end[0].area)
                                vmEditOrder.model.addressList_three.province=getProvinceName(end[0].province);
                                vmEditOrder.model.addressList_three.city=getCityName(end[0].city);
                                vmEditOrder.model.addressList_three.area=getAreaName(end[0].area);
                                vmEditOrder.model.addressList_three.address=end[0].address;
                                vmEditOrder.model.addressList_three.id = end[0].id;
                            break;
                            case 2:
                                $('.addressItem_four').show();
                                $('.unloadAddress .addressAdd').html('<img src="../../images/delete_icon.svg" class="delAddress" />');
                                $(" #province1_three option[data-code ='" + end[0].province + "']").attr("selected", "selected");
                                $("#province1_three").trigger("change");
                                $(" #city1_three option[data-code ='" + end[0].city + "']").attr("selected", "selected");
                                $("#city1_three").trigger("change");
                                $(" #district1_three option[data-code ='" + end[0].area + "']").attr("selected", "selected");
                                $("#district1_three").trigger("change");
                                $(" #province1_four option[data-code ='" + end[1].province + "']").attr("selected", "selected");
                                $("#province1_four").trigger("change");
                                $(" #city1_four option[data-code ='" + end[1].city + "']").attr("selected", "selected");
                                $("#city1_four").trigger("change");
                                $(" #district1_four option[data-code ='" + end[1].area + "']").attr("selected", "selected");
                                $("#district1_four").trigger("change");
                                vmEditOrder.model.addressList_three.province=getProvinceName(end[0].province);
                                vmEditOrder.model.addressList_three.city=getCityName(end[0].city);
                                vmEditOrder.model.addressList_three.area=getAreaName(end[0].area);
                                vmEditOrder.model.addressList_three.id = end[0].id;
                                vmEditOrder.model.addressList_three.address=end[0].address;
                                vmEditOrder.model.addressList_four.province=getProvinceName(end[1].province);
                                vmEditOrder.model.addressList_four.city=getCityName(end[1].city);
                                vmEditOrder.model.addressList_four.area=getAreaName(end[1].area);
                                vmEditOrder.model.addressList_four.id = end[1].id;
                                vmEditOrder.model.addressList_four.address=end[1].address;
                            break;
                            default:
                            break;
                        }
                        /*是否加急*/
                        let urgent = document.getElementsByName("urgent");
                        if(vmEditOrder.postData.expedited == '10'){
                            urgent[0].checked = true;
                        }else{
                            urgent[1].checked = true;
                        };
                        /*图片处理(字符串转成数组)*/
                        var imgs = res.result.goods_images.split(',');
                        for(var i in imgs){
                            var html = '<li class="delItem"><img src="'+ getApiHost + imgs[i] +'" data-src="' + imgs[i] +'" class="img_upload"  width="86px" height="86px" alt=""><span class="del">X</span></li>';
                            $('.imgItem').append(html);
                        }
                    }else{
                        checkToken(res);
                    }
                });
            },
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
                vmEditOrder.postData.car_length = '';
                vmEditOrder.postData.car_model = '';
                vmEditOrder.postData.weight='';
                vmEditOrder.postData.volume='';
                vmEditOrder.date.date = '';
                vmEditOrder.date.time = '';
                $('.delItem').remove();
            },
            /*下一步*/
            nextStep:function () {
                vmEditOrder.postData._token_ = localStorage.getItem('token');
                var carModel = $("#m1").ySelectedValues(",");
                if(carModel ==''){
                    vmEditOrder.postData.car_model = vmEditOrder.car_model;
                }else{
                    var len = carModel.split(',').length;
                    if(len > 3){
                        alertMsg('最多可以选择3个车型',2);
                        return false;
                    }else{
                        vmEditOrder.postData.car_model = carModel;
                    }
                };
                var carLength = $("#m2").ySelectedValues(",");
                if(carLength ==''){
                    vmEditOrder.postData.car_length = vmEditOrder.car_length;
                }else{
                    var len = carLength.split(',').length;
                    if(len > 3){
                        alertMsg('最多可以选择3个车长',2);
                        return false;
                    }else{
                        vmEditOrder.postData.car_length = carLength;
                    }
                };
                /*地址*/
                vmEditOrder.postData.adList=[];
                /*判断地址的显示与隐藏,取显示的地址的值*/
                var one_hidden = $('.addressItem_one').is(':hidden');
                var two_hidden = $('.addressItem_two').is(':hidden');
                var three_hidden = $('.addressItem_three').is(':hidden');
                var four_hidden = $('.addressItem_four').is(':hidden');
                if(!one_hidden){
                    vmEditOrder.model.addressList_one.province = getProvince(vmEditOrder.model.addressList_one.province);
                    vmEditOrder.model.addressList_one.city = getCode(vmEditOrder.model.addressList_one.city);
                    vmEditOrder.model.addressList_one.area = getArea(vmEditOrder.model.addressList_one.area);
                    vmEditOrder.model.addressList_one.address = vmEditOrder.model.addressList_one.address;
                    vmEditOrder.postData.adList.push(vmEditOrder.model.addressList_one);
                }
                if(!two_hidden){
                    vmEditOrder.model.addressList_two.province = getProvince(vmEditOrder.model.addressList_two.province);
                    vmEditOrder.model.addressList_two.city = getCode(vmEditOrder.model.addressList_two.city);
                    vmEditOrder.model.addressList_two.area = getArea(vmEditOrder.model.addressList_two.area);
                    vmEditOrder.model.addressList_two.address = vmEditOrder.model.addressList_two.address;
                    vmEditOrder.postData.adList.push(vmEditOrder.model.addressList_two);
                }
                if(!three_hidden){
                    vmEditOrder.model.addressList_three.province = getProvince(vmEditOrder.model.addressList_three.province);
                    vmEditOrder.model.addressList_three.city = getCode(vmEditOrder.model.addressList_three.city);
                    vmEditOrder.model.addressList_three.area = getArea(vmEditOrder.model.addressList_three.area);
                    vmEditOrder.model.addressList_three.address = vmEditOrder.model.addressList_three.address;
                    vmEditOrder.postData.adList.push(vmEditOrder.model.addressList_three);
                }
                if(!four_hidden){
                    vmEditOrder.model.addressList_four.province = getProvince(vmEditOrder.model.addressList_four.province);
                    vmEditOrder.model.addressList_four.city = getCode(vmEditOrder.model.addressList_four.city);
                    vmEditOrder.model.addressList_four.area = getArea(vmEditOrder.model.addressList_four.area);
                    vmEditOrder.model.addressList_four.address = vmEditOrder.model.addressList_four.address;
                    vmEditOrder.postData.adList.push(vmEditOrder.model.addressList_four);
                }
                //是否加急的选择
                var urgent = document.getElementsByName("urgent");
                for(var i=0;i<urgent.length;i++){
                    if(urgent[i].checked){
                        if(urgent[i].value == 'yes'){
                            vmEditOrder.postData.expedited = '10';
                        }else{
                            vmEditOrder.postData.expedited = '20';
                        }
                    }
                }
                //装货时间
                vmEditOrder.postData.loading_start_time =  vmEditOrder.date.date +' '+vmEditOrder.date.time.substr(0,8);
                vmEditOrder.postData.loading_end_time = vmEditOrder.date.date +' '+vmEditOrder.date.time.substr(11);
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
                    vmEditOrder.postData.goods_images = imgs.join(',');
                    console.log(vmEditOrder.postData)
                    getAjax(API.URL_POST_GOODSEDIT,'post',vmEditOrder.postData).then(function(res){
                        if(res.code == 200){
                            alertMsg(res.message,1);
                            location.href='./payPublishOrder.html?goods_id='+vmEditOrder.goods_id;
                        }else{
                            checkToken(res);
                        }
                    });
                }else{
                    alertMsg('请上传货物图片',2);
                }
            }
        });
        vmEditOrder.onLoad();
        avalon.scan(document.body);
    });
});
