$('.countItem').hover(function(){
    $(this).find('.mask').show();
},function(){
    $(this).find('.mask').hide();
});
layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
        layer = layui.layer;
    laypage.render({
        elem: 'demo2',
        count: 1000,
        theme: '#f57619'
    });
    laypage.render({
        elem: 'demo3',
        count: 1000,
        theme: '#f57619'
    });
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
                    if(res.result.company_logo !=''){
                        var src = getApiHost + res.result.company_logo;
                        $('#companyLogo').attr('src',src)
                    }
                    res.result.province = getProvinceName(res.result.province);
                    res.result.city = getCityName(res.result.city);
                    res.result.area = getAreaName(res.result.area);
                    vmLogistics.companyInfo = res.result;
                });
            },
            getMemberList:function(){
                getAjax(API.URL_GET_COMPANYMEMBER,'get',vmLogistics.postData).then(function(res){
                    if(res.code == 200){
                        for(var i in res.result){
                            res.result[i].avatar = getApiHost + res.result[i].avatar;
                        }
                        vmLogistics.memberList = res.result;
                        console.log('司机人员信息',res.result);
                        vmLogistics.getPageList('demo2',res.count)
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
        });
        vmLogistics.onLoad();
        avalon.scan(document.body);

    });
});
