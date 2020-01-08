// 公共方法
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmOrderDetail.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
};
$(function(){
    avalon.ready(function(){
        window.vmOrderDetail = avalon.define({
            $id:'root',
            postData:{
                '_token_':'',
                'order_id':''
            },
            startAddress:[],
            endAddress:[],
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
                        var len = imgArr.length;
                        switch(len){
                            case 1:
                                $('.img1').attr('src',imgArr[0]);
                                $('.info tr:first-child td:not(:first-child)').remove();
                                $('.sPic .btnleft').hide();
                                $('.sPic .btnright').hide();
                            break;
                            case 2:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.info tr:first-child td:nth-child(2)').nextAll().remove();
                                $('.sPic .btnleft').hide();
                                $('.sPic .btnright').hide();
                            break;
                            case 3:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.info tr:first-child td:nth-child(3)').nextAll().remove();
                                $('.sPic .btnleft').hide();
                                $('.sPic .btnright').hide();
                            break;
                            case 4:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.img4').attr('src',imgArr[3]);
                                $('.info tr:first-child td:nth-child(4)').nextAll().remove();
                                $('.sPic .btnleft').show();
                                $('.sPic .btnright').show();
                            break;
                            case 5:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.img4').attr('src',imgArr[3]);
                                $('.img5').attr('src',imgArr[4]);
                                $('.info tr:first-child td:nth-child(5)').nextAll().remove();
                                $('.sPic .btnleft').show();
                                $('.sPic .btnright').show();
                            break;
                            case 6:
                                $('.img1').attr('src',imgArr[0]);
                                $('.img2').attr('src',imgArr[1]);
                                $('.img3').attr('src',imgArr[2]);
                                $('.img4').attr('src',imgArr[3]);
                                $('.img5').attr('src',imgArr[4]);
                                $('.img6').attr('src',imgArr[5]);
                                $('.sPic .btnleft').show();
                                $('.sPic .btnright').show();
                            break;
                            default:
                            break;
                        }
                        let endTime = result.loading_end_time.substr(11);
                        result.loadingTime = result.loading_start_time +"-"+ endTime;
                        let address = res.result.line;
                        let address_len = address.length;
                        for(let i=0;i<address_len;i++){
                            address[i].province = getProvinceName(address[i].province);
                            address[i].city = getCityName(address[i].city);
                            address[i].area = getAreaName(address[i].area);
                            if(address[i].start == 1){
                                vmOrderDetail.startAddress.push(address[i])
                            }else{
                                vmOrderDetail.endAddress.push(address[i])
                            }
                        }
                        vmOrderDetail.goodsInfo = result;
                    }else{
                        checkToken(res);
                    }
                });
            }
        });
        vmOrderDetail.onLoad();
        avalon.scan(document.body);
    });
});
