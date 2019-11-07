
$(function(){
   avalon.ready(function(){
      window.vmCheckLine = avalon.define({
         $id : 'root',
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
                    var start = getCityName(res.result.start_address.city);
                    var end = getCityName(res.result.end_address.city);
                    var map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
                    var driving = new BMap.DrivingRoute(map, {
                        renderOptions: {
                            map: map,
                            autoViewport: true
                        }
                    });
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            var mk = new BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                           /* var start = new BMap.Point(r.point.lng, r.point.lat);
                            var end = new BMap.Point(116.486419, 39.877282);*/
                            driving.search(start, end);
                        }
                    });
                }else{
                    alertMsg(res.message,2);
                }
            });
          },
      });
      vmCheckLine.onLoad();
      avalon.scan(document.body);
   });
});
