$(function(){
    avalon.ready(function(){
        window.vmOrderDetail = avalon.define({
            $id:'root',
            postData:{
                '_token_':'',
                'order_id':''
            },
            startAddress:{
                'province':'',
                'city':'',
                'area':'',
                'address':''
            },
            endAddress:{
                'province':'',
                'city':'',
                'area':'',
                'address':''
            },
            goodsInfo:{},
            onLoad:function(){
                vmOrderDetail.getGoodsDetail();
            },
            getGoodsDetail:function(){
                vmOrderDetail.postData._token_  = localStorage.getItem('token');
                vmOrderDetail.postData.order_id = localStorage.getItem('goods_checkId');
                getAjax(API.URL_GET_GOODSINFO,'get',vmOrderDetail.postData).then(function(res){
                    if(res.code == 200){
                        var result = res.result;
                        var imgArr = result.goods_images.split(',');
                        for(var i in imgArr){
                            imgArr[i] = getApiHost + imgArr[i];
                        }
                        result.goods_images = imgArr;
                        console.log(imgArr)
                        var len = imgArr.length;
                        console.log(len)
                        switch(len){
                            case 1:
                                $('.img1').attr('src',imgArr[0]);
                                $('.info tr:first-child td:not(:first-child)').remove();
                            break;
                            case 2:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.info tr:first-child td:nth-child(2)').nextAll().remove();
                            break;
                            case 3:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.info tr:first-child td:nth-child(3)').nextAll().remove();
                            break;
                            case 4:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.img4').attr('src',imgArr[3]);
                                $('.info tr:first-child td:nth-child(4)').nextAll().remove();
                            break;
                            case 5:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.img4').attr('src',imgArr[3]);
                                $('.img5').attr('src',imgArr[4]);
                                $('.info tr:first-child td:nth-child(5)').nextAll().remove();
                            break;
                            case 6:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.img4').attr('src',imgArr[3]);
                                $('.img5').attr('src',imgArr[4]);
                                $('.img6').attr('src',imgArr[5]);
                            break;
                            default:
                            break;
                        }
                        vmOrderDetail.startAddress.province = getProvinceName(result.start_address.province);
                        vmOrderDetail.startAddress.city = getCityName(result.start_address.city);
                        vmOrderDetail.startAddress.area = getAreaName(result.start_address.area);
                        vmOrderDetail.startAddress.address = result.start_address.address;
                        vmOrderDetail.endAddress.province = getProvinceName(result.end_address.province);
                        vmOrderDetail.endAddress.city = getCityName(result.end_address.city);
                        vmOrderDetail.endAddress.area = getAreaName(result.end_address.area);
                        vmOrderDetail.endAddress.address = result.end_address.address;
                        var endTime = result.loading_end_time.substr(11);
                        result.loadingTime = result.loading_start_time +" "+ endTime;
                        vmOrderDetail.goodsInfo = result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            }
        });
        vmOrderDetail.onLoad();
        avalon.scan(document.body);
    });
});
