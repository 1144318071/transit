$('#distpicker').distpicker({
    autoSelect:false
});
layui.use('upload', function () {
    let token = localStorage.getItem('token');
    $ = layui.$;
    upload = layui.upload;
    $.ajaxSetup({
        // 发送cookie
        xhrFields: {
            withCredentials: true
        },
    });
    //普通图片上传
    let uploadInst = upload.render({
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
                vmCompleteInfo.postData.company_logo = res.result.crop;
            }else{
                let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                let code =  res.code;
                if(tokenCode.indexOf(code)<0){
                    alertMsg(res.message,2);
                }
            }
        },
        error: function () {
            //演示失败状态，并实现重传
            let demoText = $('#demoText');
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
                vmCompleteInfo.postData.business_license = res.result.crop;
            }else{
                let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                let code =  res.code;
                if(tokenCode.indexOf(code)<0){
                    alertMsg(res.message,2);
                }
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
        window.vmCompleteInfo = avalon.define({
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
                var province = $("#province1 option[value =" + vmCompleteInfo.areaList.provinceCode + "]").attr('data-code');
                vmCompleteInfo.postData.province = province;
            },
            getCcode: function () {
                var city = $("#city1 option[value =" + vmCompleteInfo.areaList.cityCode + "]").attr('data-code');
                vmCompleteInfo.postData.city = city;
            },
            getAcode: function () {
                var area = $("#district1 option[value =" + vmCompleteInfo.areaList.areaCode + "]").attr('data-code');
                vmCompleteInfo.postData.area = area;
            },
            // 下一步
            nextStep: function () {
                console.log(vmCompleteInfo.postData);
                if (vmCompleteInfo.postData.company_name === '' || vmCompleteInfo.postData.business_license_number === '' || vmCompleteInfo.postData.address === '') {
                    alertMsg('所有信息都不能为空', 2);
                } else if (vmCompleteInfo.postData.company_logo ==='' || vmCompleteInfo.postData.business_license === '') {
                    alertMsg('请上传图片', 2);
                } else {
                    let reg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
                    let licenseNum = vmCompleteInfo.postData.business_license_number;
                    if(reg.test(licenseNum)){
                        $('.companyInfo').hide();
                        $('.changePassword').show();
                    }else{
                        alertMsg('请输入正确格式的营业执照号',2);
                    }

                }
            },
            // 获取验证码(加上倒计时功能)
            getCheckCode:function(){
            	let phone = vmCompleteInfo.postData.mobile;
            	if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))){
			       alertMsg("请输入正确格式的手机号",2);
			       $('.layui-btn-Code').attr('disabled',true);
			    }else{
                    let token  = localStorage.getItem('token');
                    let getCode = {
	                    '_token_': token,
	                    'mobile': vmCompleteInfo.postData.mobile
	                };
	                getAjax(API.URL_POST_SENDCODE, 'post', getCode).then(function (res) {
	                    if(res.code == 200){
                            alertMsg(res.message,1)
                        }else{
                            let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                            let code =  res.code;
                            if(tokenCode.indexOf(code)<0){
                                alertMsg(res.message,2);
                            }
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
                vmCompleteInfo.postData._token_ = token;
                getAjax(API.URL_POST_VERIFYCOMPANY,'post',vmCompleteInfo.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        setTimeout(function () {
                            location.href = '../../login.html';
                        },1000);
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)<0){
                            alertMsg(res.message,2);
                        }
                    }
                });
            }
        });
        vmCompleteInfo.onLoad();
        avalon.scan(document.body);
    });
 });
