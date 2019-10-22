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
                alertMsg(res.message,1);
              /*  $('#logo').attr('src', getApiHost + res.result.crop).css({'width': "88px", "height": '118px'});
                vmCompleteInfo.postData.company_logo = res.result.crop;*/
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
                alertMsg(res.message,1);
               /* $('#license').attr('src', getApiHost + res.result.crop).css({'width': "88px", "height": '118px'});*/
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
            phoneNum:'',
            postData:{
                '_token_':'',
                'type':'',
                'company_name':'',
                'car_length':'',
                'car_type':'',
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
                console.log(userInfo)
            },
            // 获取验证码
            getCheckCode:function(){
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
            }
        });
        vmAddCar.onLoad();
        avalon.scan(document.body);
    }); 
});