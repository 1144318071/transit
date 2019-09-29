window.token = localStorage.getItem('token');
var getMan = function(url, data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            data: data,
            type: 'get',
            async: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                console.log('getRes',res)
                resolve(res);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

var postMan = function(url, data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            data: data,
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                console.log('postRes',res);
                resolve(res);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}