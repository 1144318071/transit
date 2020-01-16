// 公共方法
function checkToken(res){
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
   avalon.ready(function(){
      window.vmCheckLine = avalon.define({
         $id : 'root',
         mapMsg:{
             time:'0',
             all_distance:0,
             now_distance:0
         },
         onLoad:function(){
            vmCheckLine.getLineDetail();
         },
          getLineDetail:function(){
            var token = localStorage.getItem('token');
            var checkLineId = localStorage.getItem('checkLineId');
            var postData = {
              '_token_':token,
              'order_id':checkLineId
            };
            getAjax(API.URL_GET_GOODSINFO,'get',postData).then(function(res){
                if(res.code == 200){
                    //获取起始城市以及终点城市
                    let start = getCityName(res.result.start_address.city);
                    let end = getCityName(res.result.end_address.city);
                    let map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
                    //描绘驾车路线
                   /* let driving = new BMap.DrivingRoute(map, {
                        renderOptions: {
                            map: map,
                            autoViewport: true
                        }
                    });*/
                   /* let geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            var mk = new BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                           /!* var start = new BMap.Point(r.point.lng, r.point.lat);
                            var end = new BMap.Point(116.486419, 39.877282);*!/
                            driving.search(start, end);
                        }
                    });*/
                    //计算总距离以及总时间
                    let searchComplete = function (results){
                        if (transit.getStatus() != BMAP_STATUS_SUCCESS){
                            return ;
                        }
                        let plan = results.getPlan(0);
                        let time = '';
                        let distance = '';
                        time = plan.getDuration(true);
                        distance = plan.getDistance(true);
                        console.log(time);
                        vmCheckLine.mapMsg.all_distance = distance;
                    };
                    //根据Ip地址获取当前定位城市
                    function myFun(result){
                        let cityName = result.name;
                        let searchComplete = function(results){
                            if (transport.getStatus() != BMAP_STATUS_SUCCESS){
                                return ;
                            }
                            let plan = results.getPlan(0);
                            let time ='';
                            let distance = '';
                            time = plan.getDuration(true);
                            distance = plan.getDistance(true);
                            vmCheckLine.mapMsg.time = time;
                            vmCheckLine.mapMsg.all_distance = distance;
                        };
                        let transport = new BMap.DrivingRoute(map, {renderOptions: {map: map},
                            onSearchComplete: searchComplete,
                        });
                        transport.search(start, end);//计算全程距离
                        //当前定位城市与运输的起始城市不相同的时候，地图上面显示的是当前城市到终点的位置
                        //if(start != cityName){
                        //}else{//当前城市与定位城市相同的时候，地图显示的为订单起点城市到终点城市的距离
                    }
                    let myCity = new BMap.LocalCity();
                    myCity.get(myFun);
                }else{
                    checkToken(res);
                }
            });
          },
      });
      vmCheckLine.onLoad();
      avalon.scan(document.body);
   });
});
