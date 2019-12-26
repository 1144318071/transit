$('.tabs li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.tabContent .tabItem').eq($(this).index()).show().siblings().hide();
});
layui.use('upload', function () {
    var token = localStorage.getItem('token');
    var $ = layui.jquery,
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
        data: {
            "_token_": token,
        },
        url: API.URL_POST_UPLOADFILE,
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        },
        done: function (res) {
            vmAboutUs.count = parseInt(vmAboutUs.count);
            if(res.code == 200){
                if(vmAboutUs.count < 6){
                    var html = '<li class="delImg"><img src="'+getApiHost + res.result.crop+'" data-src="'+res.result.crop+'" class="imgs" width="131px" height="105px" alt=""> <span class="del">X</span></li>'
                    $('.uploadContent').append(html);
                    vmAboutUs.count += 1;
                }else{
                    alertMsg('最多可以上传6张图片!',2);
                }
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
// 上传图片
$('.upload').hover(function () {
    $(this).find('.uploadimg').show();
}, function () {
    $(this).find('.uploadimg').hide();
});
// 删除图片
$('.uploadContent').delegate('.del','click',function() {
    $(this).parent().remove();
})
avalon.ready(function(){
    window.vmAboutUs = avalon.define({
        $id : 'root',
        count:'0',
        postData:{
         '_token_':'',
         'question_type':'',
         'question_details':'',
         'question_picture':''
        },
        aboutUsContent:{},
        onLoad:function(){
            vmAboutUs.getAboutContent();
        },
        getAboutContent:function(){
            let token = localStorage.getItem('token');
            vmAboutUs.postData._token_ = token;
            getAjax(API.URL_GET_ABOUTUS,'get',{'_token_':token}).then(function (res) {
                if(res.code == 200){
                    vmAboutUs.aboutUsContent = res.result;
                }else{
                    let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                    let code =  res.code;
                    if(tokenCode.indexOf(code) >=0){
                        getToken();
                        vmAboutUs.onLoad();
                    }else{
                        alertMsg(res.message,2);
                    }
                }
            });
        },
        feedback:function(){
            $("input[type='radio']:checked").each(function(i,item){
                vmAboutUs.postData.question_type = $(item).attr('data-id');
            });
            var imgArr=[];
            $('.delImg img').each(function(i,val){
                var src = $(val).attr('data-src');
                imgArr.push(src);
            });
            vmAboutUs.postData.question_picture = imgArr.join(',');
            if(vmAboutUs.postData.question_type==''){
                alertMsg('请选择反馈类型!',2);
            }else{
                if(vmAboutUs.postData.question_picture==''){
                    alertMsg('请上传截图!',2)
                }else{
                    getAjax(API.URL_POST_FEEDBACK,'post',vmAboutUs.postData).then(function(res){
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
                }
            }
        }
    });
    vmAboutUs.onLoad();
    avalon.scan(document.body);
})
