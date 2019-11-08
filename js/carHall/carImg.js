$('.tab-title li').click(function () {
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $('.tab-content .tab-detail').hide();
    $('.tab-content .tab-detail').eq($(this).index()).show();
});
$(function(){
    avalon.ready(function(){
        window.vmCarImg = avalon.define({
            $id:'root',
            postData:{
                '_token_':'',
                'series':'',
                'type':''
            },
            appearance_pic:[],
            chassis_pic:[],
            interior_pic:[],
            appearance_img:'',
            chassis_img:'',
            interior_img:'',
            onLoad:function(){
                vmCarImg.geParams();
                vmCarImg.getSeriesImg();
            },
            geParams:function(){
                var token = localStorage.getItem('token');
                var src = window.location.href;
                var params = GetRequest(src);
                vmCarImg.postData._token_ = token;
                vmCarImg.postData.series = params.series;
                vmCarImg.postData.type = params.type;
                console.log(params)
            },
            getSeriesImg:function(){
                getAjax(API.URL_GET_CARIMGS,'get',vmCarImg.postData).then(function(res){
                    if(res.code == 200){
                        vmCarImg.appearance_img = res.result.appearance_pic.length;
                        vmCarImg.chassis_img = res.result.chassis_pic.length;
                        vmCarImg.interior_img = res.result.interior_pic.length;
                        if(res.result.appearance_pic.length){
                            for(var i in res.result.appearance_pic){
                                vmCarImg.appearance_pic.push(getApiHost + res.result.appearance_pic[i]);
                            }
                        }
                        if(res.result.chassis_pic.length){
                            for(var j in res.result.chassis_pic){
                                vmCarImg.chassis_pic.push(getApiHost + res.result.chassis_pic[j]);
                            }
                        }
                        if(res.result.interior_pic.length){
                            for(var k in res.result.interior_pic){
                                vmCarImg.interior_pic.push(getApiHost + res.result.interior_pic[k]);
                            }
                        }
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            }
        });
        vmCarImg.onLoad();
        avalon.scan(document.body);
    });
});
/*查看图片插件*/
/* Video Popup*/
jQuery(document).ready(function ($) {
    // Define App Namespace
    var popup = {
        // Initializer
        init: function() {
            popup.popupVideo();
        },
        popupVideo : function() {

            $('.video_model').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                gallery: {
                    enabled:true
                }
            });

            /* Image Popup*/
            /*外观*/
            $('.appearance_container').magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                gallery: {
                    enabled:true
                }
            });
            /*内饰*/
            //interior_container
            $('.interior_container').magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                gallery: {
                    enabled:true
                }
            });
            /*底盘*/
            //chassis_container
            $('.chassis_container').magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                gallery: {
                    enabled:true
                }
            });
        }
    };
    popup.init($);
});