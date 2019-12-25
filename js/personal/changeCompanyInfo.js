$('#distpicker').distpicker({
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
                vmChangeInfo.postData.company_logo = res.result.crop;
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
                vmChangeInfo.postData.business_license = res.result.crop;
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
        window.vmChangeInfo = avalon.define({
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
                'company_id':''
            },
            areaList: {
                "provinceCode": '',
                "cityCode": '',
                "areaCode": '',
            },
            onLoad: function(){
                vmChangeInfo.getCompanyInfo();
            },
            getCompanyInfo:function(){
                let token = localStorage.getItem('token');
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_':token}).then(function(res){
                    if(res.code == 200){
                        let result = res.result;
                        vmChangeInfo.postData.company_name = result.company_name;
                        vmChangeInfo.postData.business_license_number = result.business_license_number;
                        vmChangeInfo.postData.address = result.address;
                        vmChangeInfo.postData.mobile = result.mobile;
                        vmChangeInfo.postData.company_logo = result.company_logo;
                        vmChangeInfo.postData.business_license = result.business_license;
                        vmChangeInfo.postData.province = result.province;
                        vmChangeInfo.postData.city = result.city;
                        vmChangeInfo.postData.area = result.area;
                        vmChangeInfo.postData.company_id = res.result.company_id;
                        var logo = getApiHost + result.company_logo;
                        $('#logo').attr('src',logo);
                        var license = getApiHost + result.business_license;
                        $('#license').attr('src',license);
                        $(" #province1 option[data-code ='" + result.province + "']").attr("selected", "selected");
                        $("#province1").trigger("change");
                        $(" #city1 option[data-code ='" + result.city + "']").attr("selected", "selected");
                        $("#city1").trigger("change");
                        $(" #district1 option[data-code ='" + result.area + "']").attr("selected", "selected");
                        $("#district1").trigger("change");
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            // 获取省市区的code值
            getPcode: function () {
                var province = $("#province1 option[value =" + vmChangeInfo.areaList.provinceCode + "]").attr('data-code');
                vmChangeInfo.postData.province = province;
            },
            getCcode: function () {
                var city = $("#city1 option[value =" + vmChangeInfo.areaList.cityCode + "]").attr('data-code');
                vmChangeInfo.postData.city = city;
            },
            getAcode: function () {
                var area = $("#district1 option[value =" + vmChangeInfo.areaList.areaCode + "]").attr('data-code');
                vmChangeInfo.postData.area = area;
            },
            // 下一步
            nextStep: function () {
                console.log(vmChangeInfo.postData);
                if (vmChangeInfo.postData.company_name === '' || vmChangeInfo.postData.business_license_number === '' || vmChangeInfo.postData.address === '') {
                    alertMsg('所有信息都不能为空', 2);
                } else if (vmChangeInfo.postData.company_logo ==='' || vmChangeInfo.postData.business_license === '') {
                    alertMsg('请上传图片', 2);
                } else {
                    $('.companyInfo').hide();
                    $('.changePassword').show();
                }
            },
            // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
                var phone = vmChangeInfo.postData.mobile;
                if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
                    alertMsg("请输入正确格式的手机号",2);
                    $('.layui-btn-Code').attr('disabled',true);
                }else{
                    var token  = localStorage.getItem('token');
                    var getCode = {
                        '_token_': token,
                        'mobile': vmChangeInfo.postData.mobile
                    };
                    getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
                        if(res.code == 200){
                            alertMsg(res.message,1)
                        }else{
                            alertMsg(res.message,2);
                        }
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
                }
            },
            // 完善信息
            CompleteInfo:function(){
                var token = localStorage.getItem('token');
                vmChangeInfo.postData._token_ = token;
                getAjax(API.URL_POST_EDITCOMPANY,'post',vmChangeInfo.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        location.href='../../views/personal/personal.html';
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }else{
                            getToken();
                            vmChangeInfo.onLoad();
                        }
                    }
                });
            }
        });
        vmChangeInfo.onLoad();
        avalon.scan(document.body);
    });
});
