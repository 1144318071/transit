$(document).ready(function(){
    var curid = 0;
    var n = $(".chanegecolor").attr("name");
    $(".chanegecolor img").click(function(){
        var number = $(this).attr('name');
        var cH = $(".chanegecolor img").length;
        for(var i=0;i<=cH;i++){
            $(".sPic .info tr").eq(i).hide();
            $(".bigPic .info tr").eq(i).hide();
            $(".chanegecolor span").eq(i).removeClass("b00eaff");
        }
        $(".sPic .info tr").eq(number).show();
        $(".bigPic .info tr").eq(number).show();
        $(".chanegecolor span").eq(number).addClass("b00eaff");
        var s = $(".chanegecolor").attr('name',number);
        $(".sPic .info tr").eq(number).find("td").removeClass("current");
        $(".sPic .info tr").eq(number).find("td").eq(0).addClass("current");
        $(".bigPic .info").scrollLeft(0)
        return curid = 0;
    })
    $(".sPic .info td").click(function(){
        $(".sPic .info tr").eq(0).find("td").removeClass("current");
        $(this).addClass("current");
        curid = $(this).index();
        $(".bigPic .info").animate({"scrollLeft":curid*460})
    });
    $(".sPic a.btnleft").click(function(){
        $(".sPic .info").animate({"scrollLeft":"-=113"})
    });
    $(".sPic a.btnright").click(function(){
        $(".sPic .info").animate({"scrollLeft":"+=113"})
    });

});