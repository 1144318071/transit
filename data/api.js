var getApiHost = 'http://transit.scsiren.com';
var API = {
    //----------------------------------------------获取TOKEN-----------------------------------
    URL_POST_SETTOKEN: getApiHost + '/set/token',
    // 上传图片
    URL_POST_UPLOADFILE: getApiHost + '/app/file',
    // ----------------------------------------------短信验证----------------------------------
    URL_POST_SENDCODE: getApiHost + '/send/code',
    // ----------------------------------------------登录-----------------------------------
    URL_POST_USERLOGIN: getApiHost + '/api/user/login',
    // 退出登录
    URL_POST_LOGINOUT: getApiHost + '/login/out',
    // 商家信息完善
    URL_POST_VERIFYCOMPANY: getApiHost + '/company/verify',
    // ----------------------------------------------个人中心-----------------------------------
    // 个人资料
    URL_GET_PERSONALINFO: getApiHost + '/personal/info',
    // 修改头像
    URL_POST_CHANGEAVATAR: getApiHost + '/personal/update/avatar',
    // 修改密
    URL_POST_CHANGEPWD: getApiHost + '/personal/update/password',
    // 更换手机号第一步
    URL_POST_CHANGEPHONEONE: getApiHost + '/personal/update/mobile/first',
    // 更换手机号第二步
    URL_POST_CHANGEPHONETWO: getApiHost + '/personal/update/mobile/second',
    // 修改公司信息
    URL_POST_EDITCOMPANY: getApiHost + '/company/edit',
    //修改头像
    URL_POST_UPDATEAVATAR : getApiHost + '/personal/update/avatar',
    //修改支付密码
    URL_POST_SETPAYMENT : getApiHost + '/personal/set/payment',
    //----------------------------------------------账户管理-----------------------------------
    //银行卡列表
    URL_GET_BANKLIST : getApiHost + '/bank/list',
    //添加银行卡
    URL_POST_BANKADD : getApiHost + '/bank/add',
    //设置默认
    URL_POST_BANKDEFAULT : getApiHost + '/bank/default',
    //银行卡解绑
    URL_POST_BANKUNTIED : getApiHost + '/bank/untied',
    //充值
    URL_POST_BALANCERECHARGE : getApiHost + '/balance/recharge',
    //提现
    URL_POST_BALANCEWITHDRAW : getApiHost + '/balance/withdraw',
    //明细
    URL_POST_BALANCEREFUNDDETAILS : getApiHost + '/balance/fundDetails',
    //----------------------------------------------汽车大厅-----------------------------------
    // 最新新闻
    URL_GET_NEWS: getApiHost + '/news',
    //热门新闻
    URL_GET_HOTNEWS: getApiHost + '/hotNews/list',
    //热门车型
    URL_GET_HOTCAR: getApiHost + '/hot/car',
    //关注度排行
    URL_GET_ATTENTION: getApiHost + '/attention',
    //热门品牌
    URL_GET_POPULARBRANDS: getApiHost + '/popular/brands',
    //获取首字母
    URL_GET_KEYWORD: getApiHost + '/get/keyword',
    //品牌筛选
    URL_GET_BRANDSSEARCH: getApiHost + '/brands/search',
    //类型筛选
    URL_GET_TYPESEARCH : getApiHost + '/type/search',
    //优质经销商
    URL_GET_QUALITYAGENT: getApiHost + '/quality/distributor',
    //品牌详情
    URL_GET_BRANDINFO: getApiHost + '/brands/info',
    //定位地车辆
    URL_GET_CITYCAR: getApiHost + '/city/car',
    //获取车系详情
    URL_GET_CARSERIESDETAIL : getApiHost + '/series/info',
    //车型筛选(在售停售即将上市)
    URL_GET_CARFILTER : getApiHost + '/car/filter',
    //车型详情
    URL_GET_CARINFO : getApiHost + '/car/info',
    //筛选条件
    URL_GET_FILTERCONDITION : getApiHost + '/filter/condition',
    //----------------------------------------------首页-----------------------------------
    URL_GET_ENTERPRISELIST: getApiHost + '/enterprise/list',
    //新闻详情
    URL_GET_NEWSINFO: getApiHost + '/newsInfo',
    //获取banner图
    URL_GET_BANNERLIST: getApiHost + '/banner/list',
    //----------------------------------------------关于我们-----------------------------------
    URL_GET_ABOUTUS: getApiHost + '/about/us'
}