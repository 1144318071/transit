// 获取当天日期
function getNowFormatDate() {
    var date = new Date();
    var seperator = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator + month + seperator + strDate;
    return currentdate;
}

var token = localStorage.getItem('token');
if(token == null){
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



