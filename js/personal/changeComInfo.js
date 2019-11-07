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
                $('#logo').attr('src', getApiHost + res.result.crop).css({'width': "88px", "height": '118px'});
                vmchangeComInfo.postData.company_logo = res.result.crop;
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
                $('#license').attr('src', getApiHost + res.result.crop).css({'width': "88px", "height": '118px'});
                vmchangeComInfo.postData.business_license = res.result.crop;
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
$(function(){
    $('#distpicker').distpicker('reset', true);
    avalon.ready(function(){
        window.vmchangeComInfo = avalon.define({
            $id : 'root',
            postData:{
                '_token_':'',
                'company_name':'',
                'company_logo':'',
                'business_license':'',
                'business_license_number':'',
                'province':'',
                'city':'',
                'area':'',
                'address':'',
                'mobile':'',
                'code':'',
                'password':'',
                'password_confirm':''
            },
            areaList: {
                "provinceCode": '',
                "cityCode": '',
                "areaCode": '',
            },
            onLoad: function(){

            },
            // 获取省市区的code值
            getPcode: function () {
                var province = $("#province1 option[value =" + vmchangeComInfo.areaList.provinceCode + "]").attr('data-code');
                vmchangeComInfo.postData.province = province;
            },
            getCcode: function () {
                var city = $("#city1 option[value =" + vmchangeComInfo.areaList.cityCode + "]").attr('data-code');
                vmchangeComInfo.postData.city = city;
            },
            getAcode: function () {
                var area = $("#district1 option[value =" + vmchangeComInfo.areaList.areaCode + "]").attr('data-code');
                vmchangeComInfo.postData.area = area;
            },
            // 下一步
            nextStep: function () {
                console.log(vmchangeComInfo.postData);
                if (vmchangeComInfo.postData.company_name === '' || vmchangeComInfo.postData.business_license_number === '' || vmchangeComInfo.postData.address === '') {
                    alertMsg('所有信息都不能为空', 2);
                } else if (vmchangeComInfo.postData.company_logo ==='' || vmchangeComInfo.postData.business_license === '') {
                    alertMsg('请上传图片', 2);
                } else {
                    $('.companyInfo').hide();
                    $('.changePassword').show();
                }
            },
            // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
                var token  = localStorage.getItem('token');
                var getCode = {
                    '_token_': token,
                    'mobile': vmchangeComInfo.postData.mobile
                };
                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                    alertMsg(res.message,1)
                });
                let count = 60;
                const countDown = setInterval(()=>{
                    if(count === 0){
                        $('.layui-btn-Code').text('获取验证码').removeAttr('disabled');
                        clearInterval(countDown);
                    }else{
                        $('.layui-btn-Code').attr('disabled',true);
                        $('.layui-btn-Code').css({'background':'#ff0000','cursor':'pointer'});
                        $('.layui-btn-Code').text('重新发送(' + count+')');
                    }
                    count--;
                },1000);
            },
            // 完善信息
            CompleteInfo:function(){
                var token = localStorage.getItem('token');
                vmchangeComInfo.postData._token_ = token;
                getAjax(API.URL_POST_VERIFYCOMPANY,'post',vmchangeComInfo.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            }
        });
        vmchangeComInfo.onLoad();
        avalon.scan(document.body);
    });
});
