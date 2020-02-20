$(function() {
    // 热门排行
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function(backData) {
            console.log(backData);
            if (backData.code == 200) {
                for (var i = 0; i < backData.data.length; i++) {
                    $('.hotrank_list>li').eq(i).children('a').html(backData.data[i].title);
                    // 给每个a标签设置它的href属性并把当前热点新闻的id传入url
                    $('.hotrank_list>li').eq(i).children('a').attr('href', './article.html?id=' + backData.data[i].id);
                }
            }
        }
    });

    // 最新评论
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('.comment_list').html(template('comment', backData));
            }
        }
    });

    // 焦点关注
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('.guanzhu_list').html(template('gz_temp', backData));
            }
        }
    });

    //加载分类列表
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/category',
        success: function(backData) {
            // console.log(backData);
            var resHtml = template('cat_list', backData);
            // 竖着的ul类别
            $('.level_two').html('<li class="up"></li>' + resHtml);
            // 横着的ul类别
            $('ul.left_menu.fl').html(resHtml);
        }
    });

    // 搜索点击事件
    $('.search_btn').on('click', function() {
        // 获取用户输入的内容
        var searchTxt = $('.search_txt').val().trim();
        // 判断非空
        if (searchTxt == "") {
            alert('内容不能为空');
            return;
        } else {
            // 跳转页面并把用户输入的关键词传到list页面
            window.location.href = './list.html?search=' + searchTxt;
        }
    });

});