layui.use('upload', function () {
    var token = localStorage.getItem('token');
    console.log(token)
    var $ = layui.jquery,
        upload = layui.upload;
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1',
        url: API.URL_POST_UPLOADFILE,
        data: {
            "_token_": token,
        },
        xhrFields: {
            withCredentials: true
        },
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                
            });
        },
        done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            //上传成功
            console.log(res)
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
        url: '/upload/',
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            //上传成功
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
                if (vmCompleteInfo.postData.company_name == '' || vmCompleteInfo.postData.business_license_number == '' || vmCompleteInfo.postData.address == '') {
                    alertMsg('所有信息都不能为空', 2);
                } else if (vmCompleteInfo.postData.company_logo == '' || vmCompleteInfo.postData.business_license) {
                    alertMsg('请上传图片', 2);
                } else {
                    $('.companyInfo').hide();
                    $('.changePassword').show();
                    console.log(vmCompleteInfo.postData);
                }
            },
            // 完善信息
            CompleteInfo:function(){
            }
        });
        vmCompleteInfo.onLoad();
        avalon.scan(document.body);
    });
 });
