$(function() {
    // 最新资讯
    //ajax请求
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest',
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('.common_news').html(template('news', backData));
            }
        }
    });

    //1.一进到前台首页页面,就发送ajax请求,获取焦点新闻数据.
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/hotpic',
        success: function(backData) {
            // console.log(backData);
            //2.通过模板引擎渲染到前台首页上
            //  第一个li标签添加first类.
            if (backData.code == 200) {
                var resHtml = template('focus_news', backData);
                $('.focus_list').html(resHtml);
            }
        }
    });
});