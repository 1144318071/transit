$(function(){
    avalon.ready(function(){
        window.vmFooter = avalon.define({
            $id : 'footer',
            onLoad:function(){},
            getPage:function(el){
                var src = el.currentTarget.dataset.src;
                $('#test').attr('src',src);
            }
        });
        vmFooter.onLoad();
        avalon.scan(document.body);
    });
});