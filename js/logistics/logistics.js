$('.countItem').hover(function(){
    $(this).find('.mask').show();
},function(){
    $(this).find('.mask').hide();
});
$('.drivers .title li').click(function(){
   $(this).addClass('active').siblings().removeClass('active');
   $('.itemCon .item').eq($(this).index()).show().siblings().hide();
});
// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) < 0) {
        if(loginCode.indexOf(code)>=0){
            alertMsg(res.message,2);
            window.location.href='../../login.html';
        }else{
            alertMsg(res.message,2);
        }
    }
}
$(function(){
    // checkOrders
    avalon.ready(function(){
        window.vmLogistics = avalon.define({
            $id : 'root',
            postData:{
                '_token_':'',
                'keyword':'',
                'page':'',
                'limit':'5',
            },
            postRentData:{
                '_token_':'',
                '_verify':'_verify',
                'page':'1',
                'limit':'5',
                'keyword':'',
            },
            companyInfo:{},
            memberList:[],
            rentList:[],
            orderList:[],
            onLoad:function(){
                vmLogistics.getCompanyInfo();
                vmLogistics.getMemberList();
            },
            // 查看所有订单记录
            checkOrders:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1168px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['totalOrders.html']
                });
            },
            // 查看总订单金额
            checkAmount:function(){
                layer.open({
                    type: 2,
                    title: false,
                    skin: 'layui-layer-demo', //样式类名
                    closeBtn: 1, //不显示关闭按钮
                    area: ['1168px', '635px'],
                    shadeClose: true, //开启遮罩关闭
                    content: ['totalAmount.html']
                });
            },
            //获取公司信息
            getCompanyInfo:function () {
                var token = localStorage.getItem('token');
                vmLogistics.postData._token_ = token;
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_': token}).then(function(res){
                    if(res.code == 200){
                        if(res.result.company_logo !=''){
                            res.result.company_logo = getApiHost + res.result.company_logo;
                        }
                        res.result.province = getProvinceName(res.result.province);
                        res.result.city = getCityName(res.result.city);
                        res.result.area = getAreaName(res.result.area);
                        vmLogistics.companyInfo = res.result;
                    }else{
                        checkToken(res);
                    }
                });
            },
            //获取司机人员信息
            getMemberList:function(){
                vmLogistics.memberList=[];
                getAjax(API.URL_GET_COMPANYMEMBER,'get',vmLogistics.postData).then(function(res){
                    if(res.code == 200){
                        $('.noInfo').hide();
                        for(var i in res.result){
                            if(res.result[i].avatar){
                                res.result[i].avatar = getApiHost + res.result[i].avatar;
                            }
                        }
                        vmLogistics.memberList = res.result;
                        vmLogistics.getPageList('demo2',res.count)
                    }else{
                        if(res.code == 40040){
                            $('.noInfo').show();
                            $('.noInfo').html('暂无数据');
                            $('#demo2').hide();
                        }else{
                            checkToken(res);
                        }
                    }
                })
            },
            getPageList:function(elem,count){
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage,
                        layer = layui.layer;
                    //自定义样式
                    laypage.render({
                        elem: elem,
                        count: count,
                        limit:'5',
                        curr: vmLogistics.postData.page,
                        theme: '#f57619',
                        jump: function (obj,first) {
                            if(!first){
                                vmLogistics.postData.page = obj.curr;
                            }
                        }
                    });
                });
            },
            /*获取租赁列表*/
            getRentList:function(){
                vmLogistics.rentList=[];
                var token = localStorage.getItem('token');
                vmLogistics.postRentData._token_ = token;
                getAjax(API.URL_GET_LEASELIST,'get',vmLogistics.postRentData).then(function (res) {
                    if(res.code == 200){
                        $('.rentItem .noRentInfo').hide();
                        for(var i in res.result){
                            res.result[i].s_city = getCityName(res.result[i].s_city);
                            res.result[i].s_area = getAreaName(res.result[i].s_area);
                            res.result[i].e_city = getCityName(res.result[i].e_city);
                            res.result[i].e_area = getAreaName(res.result[i].e_area);
                        }
                        vmLogistics.rentList = res.result;
                        layui.use(['laypage', 'layer'], function () {
                            var laypage = layui.laypage,
                                layer = layui.layer;
                            //自定义样式
                            laypage.render({
                                elem: 'demo3',
                                count: res.count,
                                limit:'5',
                                curr: vmLogistics.postRentData.page,
                                theme: '#f57619',
                                jump: function (obj,first) {
                                    if(!first){
                                        vmLogistics.postRentData.page = obj.curr;
                                        vmLogistics.getRentList();
                                    }
                                }
                            });
                        });
                    }else{
                        if(res.code == 40040){
                            $('.rentItem .noRentInfo').show();
                            $('.rentItem .noRentInfo').html('暂无相关数据')
                            vmLogistics.rentList = [];
                            $('#demo3').hide();
                        }else{
                            $('.rentItem .noInfo').hide();
                            checkToken(res);
                        }
                    }
                })
            },
            /*下架信息*/
            removeMsg:function(el){
                var token = localStorage.getItem('token');
                getAjax(API.URL_POST_OBTAINED,'post',{'_token_':token,'id':el}).then(function(res){
                   if(res.code == 200){
                       alertMsg(res.message,1);
                       vmEditRentOrder.getRentList();
                   }else{
                       let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                       let code =  res.code;
                       if(tokenCode.indexOf(code)<0){
                           alertMsg(res.message,2);
                       }
                   }
                });
            },
        });
        vmLogistics.onLoad();
        avalon.scan(document.body);
    });
});
