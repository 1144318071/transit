var getApiHost = 'http://transit.scsiren.com';
var API = {
    //----------------------------------------------获取TOKEN-----------------------------------
    URL_POST_SETTOKEN: getApiHost + '/set/token',
    // ----------------------------------------------短信验证-----------------------------------
    URL_POST_SENDCODE: getApiHost + '/send/code',
    // ----------------------------------------------登录-----------------------------------
    URL_POST_USERLOGIN: getApiHost + '/api/user/login',
    //----------------------------------------------最新新闻-----------------------------------
    URL_GET_NEWS: getApiHost + '/news'
}
