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
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1',
        url: API.URL_POST_UPLOADFILE,
        data: {
            "_token_": token,
        },
        done: function (res) {
            //上传成功
            if(res.code === 200){
                if(vmAddCar.drivingCount < 2){
                    alertMsg(res.message,1);
                    var html = '<li class="ml10"><img src="'+getApiHost + res.result.crop+'" data-src="'+res.result.crop+'" class="driving_license"  width="95px" height="76px" alt=""></li>'
                    $('.imgItem_logo').append(html);
                    vmAddCar.drivingCount = parseInt(vmAddCar.drivingCount);
                    vmAddCar.drivingCount += 1;
                }else{
                    alertMsg('最多可以上传2张图片',2);
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
    upload.render({
        elem: '#test2',
        url: API.URL_POST_UPLOADFILE,
        data: {
            "_token_": token,
        },
        done: function (res) {
            if(res.code === 200){
                if(vmAddCar.carImgCount < 4){
                    var html = '<li class="ml10"><img src="'+getApiHost + res.result.crop+'" data-src="'+res.result.crop+'"  class="uploadCarImgs" width="95px" height="76px" alt=""></li>';
                    $('.carImgItem').append(html);
                    vmAddCar.carImgCount = parseInt(vmAddCar.carImgCount);
                    vmAddCar.carImgCount += 1;
                }else{
                    alertMsg('最多可以上传4张图片',2);
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
$(function(){
    // 上传图片的滑入滑出效果
    $('.upload').hover(function(){
        $(this).find('.uploadimg').show();
    },function(){
        $(this).find('.uploadimg').hide();
    });
    avalon.ready(function(){
        window.vmAddCar = avalon.define({
            $id : 'root',
            drivingCount:'0',
            carImgCount:'0',
            phoneNum:'',
            postData:{
                '_token_':'',
                'type':'20',
                'company_name':'',
                'car_type':'不限',
                'license_plate':'',
                'weight':'',
                'volume':'',
                'driving_license':'',
                'vehicle_picture':'',
                'code':'',
                'brand':''
            },
            onLoad:function(){
                vmAddCar.getUserInfo()
            },
            // 取消
            cancelAdd:function(){
                parent.layer.close(parent.layer.index);
            },
            getUserInfo:function(){
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                vmAddCar.phoneNum = userInfo.mobile;
            },
            // 获取验证码
            getCheckCode:function(){
                var token = localStorage.getItem('token');
                var getCode = {
                    '_token_': token,
                    'mobile': vmAddCar.phoneNum
                };
                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        alertMsg(res.message,2);
                    }
                });
                let count = 60;
                const countDown = setInterval(() => {
                    if (count == 0) {
                        $('.btn-gray').text('获取验证码').removeAttr('disabled');
                        clearInterval(countDown);
                    } else {
                        $('.btn-gray').attr('disabled', true);
                        $('.btn-gray').css({
                            'background': '#ff0000',
                            'cursor': 'pointer',
                            'border':'1px solid #f00'
                        });
                        $('.btn-gray').text('重新发送(' + count + ')');
                    }
                    count--;
                }, 1000);

            },
            // 添加车辆
            addCar:function(){
                vmAddCar.postData._token_ = localStorage.getItem('token');
                var driving_license = document.getElementsByClassName('driving_license');
                var vehicle_picture = document.getElementsByClassName('uploadCarImgs');
                var img1Arr = [];
                var img2Arr = [];
                for(var i =0;i<driving_license.length;i++){
                    var src = $(driving_license[i]).attr('data-src');
                    img1Arr.push(src);
                }
                vmAddCar.postData.driving_license = img1Arr.join(',');
                var len = vehicle_picture.length;
                for(var i =0 ; i<vehicle_picture.length;i++){
                    var src = $(vehicle_picture[i]).attr('data-src');
                    img2Arr.push(src);
                }
                vmAddCar.postData.vehicle_picture = img2Arr.join(',');
               /* $('.formItem li input[type=text]').each(function(i,item){
                   if($(item).val() == ''){
                        alertMsg('所填信息不能为空',2);
                        return false;
                   }else{
                       if(vmAddCar.postData.driving_license == '' || vmAddCar.postData.vehicle_picture == ''){
                           alertMsg('请上传相关图片!',2);
                           return false;
                       }
                   }
                });*/
                console.log(vmAddCar.postData)
                getAjax(API.URL_POST_VEHICLEADD,'post',vmAddCar.postData).then(function(res){
                    if(res.code == 200){
                        layer.open({
                            type: 2,
                            title: false,
                            skin: 'layui-layer-demo', //样式类名
                            closeBtn: 1, //不显示关闭按钮
                            area: ['780px', '470px'],
                            shadeClose: true, //开启遮罩关闭
                            content: ['carChecking.html']
                        });
                        setTimeout(function(){
                           parent.layer.close(parent.layer.index)
                        },1000);
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
        });
        vmAddCar.onLoad();
        avalon.scan(document.body);
    }); 
});