$('.statusList li').click(function(){
    $(this).addClass('hightLight').siblings().removeClass('hightLight');
    $('.statusContent .statusDetail').eq($(this).index()).show().siblings().hide();
});
var province = [];
function getProvince() {
    for (var i in Area.provinces.province) {
        province.push('<a href="javascript:setCity(' + Area.provinces.province[i].ssqid + ')">' + Area.provinces.province[i].ssqname + '</a>');
    }
    return province.join(' ');
}
var city = [];
function getCity(id) {
    for (var k in Area.provinces.province) {
        if (Area.provinces.province[k].ssqid == id) {
            for (var i in Area.provinces.province[k].cities.city) {
                city.push('<a href="javascript:getAgentList(' + Area.provinces.province[k].cities.city[i].ssqid +')">' + Area.provinces.province[k].cities.city[i].ssqname + '</a>');
            }
        }
    }
    return city.join(' ');
}
function setCity(id) {
    city = [];
    document.getElementById('city').innerHTML = getCity(id);
    vmCarSeriesDetail.agentData.province = id;
    if(id == 1){
        vmCarSeriesDetail.agentData.province='',
        vmCarSeriesDetail.agentData.city='';
        $('.city').hide();
        getAgentList();
    }else{
        $('.city').show();
        getAgentList();
    }
}
/*获取优质经销商列表*/
function getAgentList(res) {
    vmCarSeriesDetail.agentData.city = res;
    vmCarSeriesDetail.agentList = [];
    getAjax(API.URL_GET_QUALITYAGENT,'get',vmCarSeriesDetail.agentData).then(function(res){
        if(res.code == 200){
            for(var i=0;i<res.result.length;i++){
                var provinceCode = res.result[i].province;
                var cityCode = res.result[i].city;
                var areaCode = res.result[i].area;
                var p = getProvinceName(provinceCode)
                var c= getCityName(cityCode);
                var a = getAreaName(areaCode);
                res.result[i].province = p;
                res.result[i].city = c;
                 res.result[i].area = a;
                res.result[i].shop_logo = getApiHost + res.result[i].shop_logo;
            }
            vmCarSeriesDetail.agentList = res.result;
        }else{
            alertMsg(res.message,2);
        }
    });
}
document.getElementById('province').innerHTML = getProvince();
$('#province a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});
$("#city").delegate("a", "click", function () {
    $(this).addClass('active').siblings().removeClass('active')
});
// 公共方法
function checkToken(res) {
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmCarSeriesDetail.onLoad();
    }else{
        alertMsg(res.message,2);
    }
}
$(function(){
    avalon.ready(function(){
        window.vmCarSeriesDetail = avalon.define({
            $id:'root',
            data:{},
            newsList:[],
            carList:[],
            relatedCars:[],
            carDetail:{},
            page:1,
            page_10:1,//在售
            page_20:1,//停售
            page_30:1,//即将上市
            keyword:'',
            filterData:{
                '_token_':'',
                'series':'',
                'group':'',
                'type':'',
                'status':'10',
                'base_drive':'',
                'engine':'',
                'engine_max_power':'',
                'gearbox_forward_gear':'',
                'page':'',
                'limit':''
            },
            agentData:{
                '_token_':'',
                'brands_id':'',
                'province':'',
                'city':''
            },
            loadingData:{
              '_token_':'',
              'series':'',
              'group':'',
              'type':'',
              'status':'',
              'base_drive':'',
              'page':1,
              'limit':2
            },
            ZSList:[],
            TSList:[],
            SSList:[],
            filterList:[],
            agentList:[],
            moreList:[],
            loadingList:[],
            car_ty:'',
            onLoad:function(){
                vmCarSeriesDetail.getUrlJson();
            },
            getPage: function (el) {
                let src = el.currentTarget.dataset.src;
                location.href = src;
            },
            getSearch:function(){
                let keyword = vmCarSeriesDetail.keyword;
                localStorage.setItem('searchKeyWord',keyword);
                location.href = '../../views/carHall/carfilter.html';
            },
            //获取url传过来的值
            getUrlJson:function(){
                let url = location.href;
                let data = GetRequest(url);
                console.log(data)
                vmCarSeriesDetail.car_ty = data.car_ty;
                let token = localStorage.getItem('token');
                data.token = token;
                vmCarSeriesDetail.data = data;
                vmCarSeriesDetail.agentData._token_ = token;
                vmCarSeriesDetail.loadingData._token_ = token;
                vmCarSeriesDetail.loadingData.type = data.car_ty;
                vmCarSeriesDetail.loadingData.series = data.series;
                vmCarSeriesDetail.agentData.brands_id = data.id;
                vmCarSeriesDetail.getSeriesDetail();
            },
            //获取车系详情
            getSeriesDetail:function(){
                var postData={
                    '_token_':vmCarSeriesDetail.data.token,
                    'series':vmCarSeriesDetail.data.series,
                    'brands_id':vmCarSeriesDetail.data.id,
                    'type':vmCarSeriesDetail.data.car_ty
                }
                getAjax(API.URL_GET_CARSERIESDETAIL,'get',postData).then(function(res){
                    if(res.code == 200){
                        vmCarSeriesDetail.newsList = res.result.news;
                        vmCarSeriesDetail.ZSList = res.result.carList;
                        vmCarSeriesDetail.relatedCars = res.result.relatedCars;
                        vmCarSeriesDetail.carDetail = res.result.list;
                        vmCarSeriesDetail.getStatusList();
                    }else{
                        checkToken(res);
                    }
                });
            },
            //在售 停售 即将上市
            getStatusList:function(){
                vmCarSeriesDetail.filterData._token_ = vmCarSeriesDetail.data.token;
                vmCarSeriesDetail.filterData.series = vmCarSeriesDetail.carDetail.series;
                vmCarSeriesDetail.filterData.group = vmCarSeriesDetail.carDetail.group;
                vmCarSeriesDetail.filterData.type = vmCarSeriesDetail.data.car_ty;
                getAjax(API.URL_GET_CARFILTER,'get',vmCarSeriesDetail.filterData).then(function(res){
                    if(res.code == 200){
                        vmCarSeriesDetail.carList = res.result;
                        switch(vmCarSeriesDetail.filterData.status){
                            case '10':
                                vmCarSeriesDetail.ZSList = res.result;
                                break;
                            case '20':
                                vmCarSeriesDetail.TSList = res.result;
                                break;
                            case '30':
                                vmCarSeriesDetail.SSList = res.result;
                                break;
                            default:
                                break;
                        }
                    }else{
                        checkToken(res);
                    }
                });
            },
            /*在售*/
            getZSList:function(){
                vmCarSeriesDetail.filterData.status = '10';
                vmCarSeriesDetail.filterData.base_drive = '';
                vmCarSeriesDetail.filterData.engine = '';
                vmCarSeriesDetail.filterData.engine_max_power = '';
                vmCarSeriesDetail.filterData.gearbox_forward_gear = '';
                vmCarSeriesDetail.filterData.page = 1;
                vmCarSeriesDetail.filterData.limit = '';
                vmCarSeriesDetail.getStatusList();
            },
            /*停售*/
            getTSList:function(){
                vmCarSeriesDetail.filterData.status = '20';
                vmCarSeriesDetail.filterData.base_drive = '';
                vmCarSeriesDetail.filterData.engine = '';
                vmCarSeriesDetail.filterData.engine_max_power = '';
                vmCarSeriesDetail.filterData.gearbox_forward_gear = '';
                vmCarSeriesDetail.filterData.page = 1;
                vmCarSeriesDetail.filterData.limit = '';
                vmCarSeriesDetail.getStatusList();
            },
            /*即将上市*/
            getSHList:function () {
                vmCarSeriesDetail.filterData.status = '30';
                vmCarSeriesDetail.filterData.base_drive = '';
                vmCarSeriesDetail.filterData.engine = '';
                vmCarSeriesDetail.filterData.engine_max_power = '';
                vmCarSeriesDetail.filterData.gearbox_forward_gear = '';
                vmCarSeriesDetail.filterData.page = 1;
                vmCarSeriesDetail.filterData.limit = '';
                vmCarSeriesDetail.getStatusList();
            },
            getFilterList:function(){
                vmCarSeriesDetail.getStatusList();
            },
            getMoreData:function(el){
                let page = parseInt(vmCarSeriesDetail.page);
                vmCarSeriesDetail.page = page;
                vmCarSeriesDetail.page += 1;
                vmCarSeriesDetail.filterData.page = vmCarSeriesDetail.page;
                vmCarSeriesDetail.filterData.limit = 2;
                vmCarSeriesDetail.filterData.status = el;
                getAjax(API.URL_GET_CARFILTER,'get',vmCarSeriesDetail.filterData).then(function(res){
                    if(res.code == 200){
                        vmCarSeriesDetail.moreList = res.result[0];
                        var moreList = res.result[0];
                        switch (el) {
                            case 10:
                                for(var i in moreList){
                                    moreList[i].statusContent='在售';
                                }
                            break;
                            case 20:
                                for(var j in moreList){
                                    moreList[j].statusContent='停售';
                                }
                            break;
                            case 30:
                                for(var k in moreList){
                                    moreList[k].statusContent='即将上市';
                                }
                            break;
                        }
                        var loopItem='';
                        $(moreList).each(function(index,item){
                            loopItem += "<tr>\n" +
                                "    <td>\n" +
                                "        <div class=\"selectDetail\">\n" +
                                "            <span>"+item.manager_name+"</span>\n" +
                                "            <span>"+item.type_name +"</span>\n" +
                                "            <span><span>"+item.engine_max_power+"</span>马力</span>\n" +
                                "            <span><span>"+item.base_drive+"</span></span>\n" +
                                "            <span>(<i>"+item.car_number+"</i>)</span>\n" +
                                "        </div>\n" +
                                "        <div class=\"allStatus\">\n" +
                                "            <button>"+item.statusContent+"</button>\n" +
                                "            <button><span>"+item.base_long+"</span>米</button>\n" +
                                "            <button>核载<span>"+item.base_load+"</span>吨</button>\n" +
                                "        </div>\n" +
                                "    </td>\n" +
                                "    <td>\n" +
                                "        <span>"+item.price+"</span>万\n" +
                                "    </td>\n" +
                                "    <td>\n" +
                                "        <a href=\"./checkSeriesDetail.html?car_ty="+item.car_type+'&id='+item.id+"\">查看图片</a>\n" +
                                "    </td>\n" +
                                "    <td>\n" +
                                "        <a href=\"./checkSeriesDetail.html?car_ty="+item.car_type+'&id='+item.id+"\">查看参数</a>\n" +
                                "    </td>\n" +
                                "</tr>";
                        });
                        $('.moreData').before(loopItem);
                    }else{
                        checkToken(res);
                    }
                });
            },
            /*点击加载更多*/
            loadingMore:function(el,base,group){
                console.log(el,base,group)
                let base_drive = vmCarSeriesDetail.loadingData.base_drive;
                let status = vmCarSeriesDetail.loadingData.status;
                let groupItem = vmCarSeriesDetail.loadingData.group;
                if(base != base_drive || status != el || groupItem != group){
                    vmCarSeriesDetail.page = 1;
                }
                let page = parseInt(vmCarSeriesDetail.page);
                vmCarSeriesDetail.page = page;
                vmCarSeriesDetail.page += 1;
                vmCarSeriesDetail.loadingData.page = vmCarSeriesDetail.page;
                vmCarSeriesDetail.loadingData.status = el;
                vmCarSeriesDetail.loadingData.base_drive = base;
                vmCarSeriesDetail.loadingData.group = group;
                getAjax(API.URL_GET_LOADINGMORE,'get',vmCarSeriesDetail.loadingData).then(function(res){
                    if(res.code == 200){
                        vmCarSeriesDetail.loadingList = res.result[0];
                        let loadingList = res.result[0];
                        switch(el) {
                            case 10:
                                for(let i in loadingList){
                                    loadingList[i].statusContent='在售';
                                }
                            break;
                            case 20:
                                for(let j in loadingList){
                                    loadingList[j].statusContent='停售';
                                }
                                break;
                            case 30:
                                for(let k in loadingList){
                                    loadingList[k].statusContent='即将上市';
                                }
                                break;
                        }
                        let loopItem='';
                        $(loadingList).each(function(index,item){
                            loopItem += "<tr>\n" +
                                "    <td>\n" +
                                "        <div class=\"selectDetail\">\n" +
                                "            <span>"+item.manager_name+"</span>\n" +
                                "            <span>"+item.type_name +"</span>\n" +
                                "            <span><span>"+item.engine_max_power+"</span>马力</span>\n" +
                                "            <span><span>"+item.base_drive+"</span></span>\n" +
                                "            <span>(<i>"+item.car_number+"</i>)</span>\n" +
                                "        </div>\n" +
                                "        <div class=\"allStatus\">\n" +
                                "            <button>"+item.statusContent+"</button>\n" +
                                "            <button><span>"+item.base_long+"</span>米</button>\n" +
                                "            <button>核载<span>"+item.base_load+"</span>吨</button>\n" +
                                "        </div>\n" +
                                "    </td>\n" +
                                "    <td>\n" +
                                "        <span>"+item.price+"</span>万\n" +
                                "    </td>\n" +
                                "    <td>\n" +
                                "        <a href=\"./checkSeriesDetail.html?car_ty="+item.car_type+'&id='+item.id+"\">查看图片</a>\n" +
                                "    </td>\n" +
                                "    <td>\n" +
                                "        <a href=\"./checkSeriesDetail.html?car_ty="+item.car_type+'&id='+item.id+"\">查看参数</a>\n" +
                                "    </td>\n" +
                                "</tr>";
                        });
                        $('#base_drive_'+base).before(loopItem)
                    }else{
                        let tokenCode = [43961,43962,43963,43964,43965,43966,43967,43968];
                        let code =  res.code;
                        if(tokenCode.indexOf(code)>=0){
                            getToken();
                            vmCarSeriesDetail.onLoad();
                        }else if(code == 40040){
                            $('#base_drive_'+base).hide();
                        }else{
                            alertMsg(res.message,2);
                        }
                    }
                });
            },
        });
        vmCarSeriesDetail.onLoad();
        $('#province>a:first-child').addClass('active');
        setCity(1);
        avalon.scan(document.body);

    });
});
