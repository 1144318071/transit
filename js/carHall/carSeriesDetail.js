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
        getAgentList();
    }
}
function getAgentList(res) {
    vmCarSeriesDetail.agentData.city = res;
    getAjax(API.URL_GET_QUALITYAGENT,'get',vmCarSeriesDetail.agentData).then(function(res){
        vmCarSeriesDetail.agentList = res.result;
        for(var i=0;i<res.result.length;i++){
            var provinceCode = res.result[i].province;
            var cityCode = res.result[i].city;
            var areaCode = res.result[i].area;
            var p = getProvinceName(provinceCode)
            var c= getCityName(cityCode);
            /*var a = getAreaName(areaCode);*/
            res.result[i].province = p;
            res.result[i].city = c;
           /* res.result[i].area = a;*/
            res.result[i].shop_logo = getApiHost + res.result[i].shop_logo;
        }
        console.log(vmCarSeriesDetail.agentList);
    });
}
document.getElementById('province').innerHTML = getProvince();
$('#province a').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});
$("#city").delegate("a", "click", function () {
    $(this).addClass('active').siblings().removeClass('active')
});

$(function(){
    avalon.ready(function(){
        window.vmCarSeriesDetail = avalon.define({
            $id:'root',
            data:{},
            newsList:[],
            carList:[],
            relatedCars:[],
            carDetail:{},
            page:'1',
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
            ZSList:[],
            TSList:[],
            SSList:[],
            filterList:[],
            agentList:[],
            moreList:[],
            onLoad:function(){
                vmCarSeriesDetail.getUrlJson();
            },
            getPage: function (el) {
                var src = el.currentTarget.dataset.src;
                location.href = src;
            },
            //获取url传过来的值
            getUrlJson:function(){
                var url = location.href;
                var data = GetRequest(url);
                var token = localStorage.getItem('token');
                data.token = token;
                vmCarSeriesDetail.data = data;
                vmCarSeriesDetail.agentData._token_ = token;
                vmCarSeriesDetail.agentData.brands_id = data.id;
                vmCarSeriesDetail.getSeriesDetail();
                console.log('url传参传过来的数据',vmCarSeriesDetail.data)
            },
            getSeriesDetail:function(){
                var postData={
                    '_token_':vmCarSeriesDetail.data.token,
                    'series':vmCarSeriesDetail.data.series,
                    'brands_id':vmCarSeriesDetail.data.id,
                    'type':vmCarSeriesDetail.data.car_ty
                }
                getAjax(API.URL_GET_CARSERIESDETAIL,'get',postData).then(function(res){
                    vmCarSeriesDetail.newsList = res.result.news;
                    vmCarSeriesDetail.ZSList = res.result.carList;
                    vmCarSeriesDetail.relatedCars = res.result.relatedCars;
                    vmCarSeriesDetail.carDetail = res.result.list;
                    vmCarSeriesDetail.getStatusList();
                });

            },
            getStatusList:function(){
                vmCarSeriesDetail.filterData._token_ = vmCarSeriesDetail.data.token;
                vmCarSeriesDetail.filterData.series = vmCarSeriesDetail.carDetail.series;
                vmCarSeriesDetail.filterData.group = vmCarSeriesDetail.carDetail.group;
                vmCarSeriesDetail.filterData.type = vmCarSeriesDetail.data.car_ty;
                getAjax(API.URL_GET_CARFILTER,'get',vmCarSeriesDetail.filterData).then(function(res){
                    vmCarSeriesDetail.carList = res.result;
                    console.log(res.result)
                    switch(vmCarSeriesDetail.filterData.status){
                        case '10':
                            vmCarSeriesDetail.ZSList = res.result;
                            console.log('在售',vmCarSeriesDetail.ZSList)
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
                });
            },
            /*在售*/
            getZSList:function(){
                vmCarSeriesDetail.filterData.status = '10';
                vmCarSeriesDetail.filterData.base_drive = '';
                vmCarSeriesDetail.filterData.engine = '';
                vmCarSeriesDetail.filterData.engine_max_power = '';
                vmCarSeriesDetail.filterData.gearbox_forward_gear = '';
                vmCarSeriesDetail.filterData.page = '';
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
                vmCarSeriesDetail.filterData.page = '';
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
                vmCarSeriesDetail.filterData.page = '';
                vmCarSeriesDetail.filterData.limit = '';
                vmCarSeriesDetail.getStatusList();
            },
            getFilterList:function(){
                vmCarSeriesDetail.getStatusList();
            },
            getMoreData:function(el){
                var page = parseInt(vmCarSeriesDetail.page);
                vmCarSeriesDetail.page = page;
                vmCarSeriesDetail.page += 1;
                vmCarSeriesDetail.filterData.page = vmCarSeriesDetail.page;
                console.log(vmCarSeriesDetail.filterData.page)
                vmCarSeriesDetail.filterData.limit = 2;
                vmCarSeriesDetail.filterData.status = el;
                getAjax(API.URL_GET_CARFILTER,'get',vmCarSeriesDetail.filterData).then(function(res){
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
                    $('.moreData').before(loopItem)
                    console.log('加载更多',res.result[0]);
                });
            }
        });
        vmCarSeriesDetail.onLoad();
        avalon.scan(document.body);

    });
});
