$('.countItem').hover(function(){
    $(this).find('.mask').show();
},function(){
    $(this).find('.mask').hide();
});
$('.drivers .title li').click(function(){
   $(this).addClass('active').siblings().removeClass('active');
   $('.itemCon .item').eq($(this).index()).show().siblings().hide();
});
$(function(){
    // checkOrders
    avalon.ready(function(){
        window.vmLogistics = avalon.define({
            $id : 'root',
            onLoad:function(){
                vmLogistics.getCompanyInfo();
                vmLogistics.getMemberList();
            },
            postData:{
                '_token_':'',
                'keyword':'',
                'page':'',
                'limit':'5',
            },
            companyInfo:{},
            memberList:[],
            rentList:[],
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
            getCompanyInfo:function () {
                var token = localStorage.getItem('token');
                vmLogistics.postData._token_ = token;
                getAjax(API.URL_GET_PERSONALINFO,'get',{'_token_': token}).then(function(res){
                    if(res.code == 200){
                        if(res.result.company_logo !=''){
                            var src = getApiHost + res.result.company_logo;
                            $('#companyLogo').attr('src',src)
                        }
                        res.result.province = getProvinceName(res.result.province);
                        res.result.city = getCityName(res.result.city);
                        res.result.area = getAreaName(res.result.area);
                        vmLogistics.companyInfo = res.result;
                    }else{
                        alertMsg(res.message,2);
                    }
                });
            },
            getMemberList:function(){
                getAjax(API.URL_GET_COMPANYMEMBER,'get',vmLogistics.postData).then(function(res){
                    if(res.code == 200){
                        for(var i in res.result){
                            res.result[i].avatar = getApiHost + res.result[i].avatar;
                        }
                        vmLogistics.memberList = res.result;
                        vmLogistics.getPageList('demo2',res.count)
                    }else{
                        if(res.code == 40040){
                            $('.noInfo').show();
                            $('.noInfo').html('暂无数据')
                        }else{
                            alertMsg(res.message,2);
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
                var token = localStorage.getItem('token');
                getAjax(API.URL_GET_LEASELIST,'get',{'_token_':token}).then(function(res){
                   if(res.code == 200){
                       for(var i in res.result){
                           res.result[i].s_city = getCityName(res.result[i].s_city);
                           res.result[i].s_area = getAreaName(res.result[i].s_area);
                           res.result[i].e_city = getCityName(res.result[i].e_city);
                           res.result[i].e_area = getAreaName(res.result[i].e_area);
                       }
                       vmLogistics.rentList = res.result;
                       console.log(res.result);
                       vmLogistics.getPageList('demo3',res.count)
                   }else{
                       alertMsg(res.message,2)
                   }
                });
            },
        });
        vmLogistics.onLoad();
        avalon.scan(document.body);

    });
});
