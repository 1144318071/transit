// 错误信息提示
layui.use('layer', function () {
    layer = layui.layer;
});
function alertMsg(msg, icon) {
    layer.msg(msg, {
        icon: icon
    });
}
//获取当前时间
function getNowFormatDate() {
    let date = new Date();
    let seperator = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if(month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentDate = date.getFullYear() + seperator + month + seperator + strDate;
    return currentDate;
}
/*获取token*/
function getToken(){
    $.ajax({
        url: API.URL_POST_SETTOKEN,
        type: 'post',
        dataType: 'json',
        async: true,
        data: { version: '2.0.1', author: '丶Lee', email: '1144318071@qq.com', date: getNowFormatDate},
        xhrFields: {
            withCredentials: true
        },
        success:function(res){
            if(res.code == 200){
                localStorage.setItem('token',res.result.token);
            }
        }
    });
}
//ajax请求数据的公共方法
function getAjax(url, type, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            async: true,
            data: data,
            xhrFields: {
                withCredentials: true
            }
        }).done(function (res) {
           resolve(res);
        }).fail(function (err) {
            reject(err);
        });
    });
};
//获取get传值的参数
function GetRequest(urlStr) {
    if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
//改变url的参数值
function changeUrlArg(url, arg, val){
    var pattern = arg+'=([^&]*)';
    var replaceText = arg+'='+val;
    return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
}
//获取城市的code码
function getCode(name){
    for(var i in Area.provinces.province){
        for(var j in Area.provinces.province[i].cities.city){
            if(Area.provinces.province[i].cities.city[j].ssqname == name){
                return Area.provinces.province[i].cities.city[j].ssqid;
            }
        }
    }
}
/*获取城市的名称*/
function getCityName(code){
    for(var k in Area.provinces.province){
        for(var l in Area.provinces.province[k].cities.city){
            if(Area.provinces.province[k].cities.city[l].ssqid == code){
                return Area.provinces.province[k].cities.city[l].ssqname;
            }
        }
    }
}
/*获取省份的名称*/
function getProvinceName(code){
    for(var m in Area.provinces.province){
        if(Area.provinces.province[m].ssqid == code){
            return Area.provinces.province[m].ssqname;
        }
    }
}
/*获取省份的code*/
function getProvince(name){
    for(let i in Area.provinces.province){
        if(Area.provinces.province[i].ssqname == name){
            return Area.provinces.province[i].ssqid;
        }
    }
}
/*获取地区的名称*/
function getAreaName(code){
    for(var i in Area.provinces.province){
        for(var j in Area.provinces.province[i].cities.city){
            for(var k in Area.provinces.province[i].cities.city[j].areas.area){
                if(Area.provinces.province[i].cities.city[j].areas.area[k].ssqid == code){
                    return Area.provinces.province[i].cities.city[j].areas.area[k].ssqname
                }
            }
        }
    }
};
/*获取地区的code值*/
function getArea(name){
    for(let i in Area.provinces.province){
        for(var j in Area.provinces.province[i].cities.city){
            for(var k in Area.provinces.province[i].cities.city[j].areas.area){
                if(Area.provinces.province[i].cities.city[j].areas.area[k].ssqname == name){
                    return Area.provinces.province[i].cities.city[j].areas.area[k].ssqid
                }
            }
        }
    }
}
//隐藏银行卡号码
function stringHidePart(strObj){
    var strLength = strObj.length;
    var star = '';
    var strRel = '';
    if(strLength>6){
        var hideSec = strObj.substring(3); //星号部分
        for(var i=5;i<hideSec.length;i++){
            star+= "*";
        }
    };
    strRel = strObj.substring(0,4) + star + strObj.substr(strObj.length-3);
    return strRel;
};
//手机号隐藏
function stringHidePhone(strObj){
    var strLength = strObj.length;
    var star = '';
    var strRel = '';
    if(strLength>3){
        var hideSec = strObj.substring(3);
        for(var i=4;i<hideSec.length;i++){
            star+= "*";
        }
    };
    strRel = strObj.substring(0,3) + star + strObj.substr(strObj.length-4);
    return strRel;
};
