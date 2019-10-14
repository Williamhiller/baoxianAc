/**
 * 警告框
 * @param text
 */
var showAlert = function (text) {
    $('.alert').text(text).addClass('on');
    // 动画效果是300毫秒，显示1秒钟后消失
    setTimeout(function () {
        $('.alert').removeClass('on');
    },1300)
};

// 记录输入值
var userData = {
    country : '',
    startDate : '',
    endDate : ''
};
var pageInit = function () {
    // index_page 为首页
    // 页面初始全部隐藏 class="hidden"
    // 根据 CampaignId 状态 ？ 先判断是否关注公众号
    if(campaignId === "未关注") {
        $('.index_page').removeClass('hidden');
        $('.top_info_wrap').removeClass('hidden'); // 顶部信息

        // 如果来自好友推荐
        if(isFromFriend) {
            $('.view_friend').removeClass('hidden');  // 点击获取
            setRelation(); // 记录两者好友关系
        }else {
            $('.view_self').removeClass('hidden');  //  底部公众号二维码
        }
        return;
    }
    //  进入环节，获取地点
    if(campaignId === "获取地点") {
        $('.index_page').removeClass('hidden');
        $('.flow_destination').removeClass('hidden');
        getDestination();
    }

    $('.btn_alert_get').on('click', function () {
        $('.alert_wrap').addClass('fade');
        setTimeout(function () {
            $('.alert_wrap').addClass('hidden');
        },300)
    })
};
/**
 * 设置关系
 */
function setRelation() {
    // $.ajax({
    //     type : 'POST',
    //     data : {},
    //     success : function () {
    //
    //     }
    // })
}
/**
 * 出行目的地
 */
function getDestination() {
    // 选择国家， 后边字母对应的是国旗的 iconfont
    var countryList = {
        "申根国家" : "PASS",
        "德国" :  "DE",
        "法国" :  "FR",
        "意大利" :  "IT",
        "瑞士" :  "CH",
        "美国" :  "US",
        "荷兰" :  "NL",
        "英国" :  "UK",
        "瑞典" :  "SE",
        "西班牙" :  "ES",
        "比利时" :  "BE",
        "希腊" :  "GR",
        "泰国" :  "TH",
        "中国香港" :  "HK",
        "中国澳门" :  "MO",
        "马来西亚" :  "MY",
        "日本" :  "JP",
        "澳大利亚" :  "AU",
        "新加坡" :  "SG",
        "韩国" :  "KR",
        "奥地利" :  "AT"
    };
    Object.keys(countryList).forEach(function (key) {
        $('#country').append('<option value="'+key+'">'+key+'</option>')
    });

    $('.flow_destination .btn_next').on('click', function () {

        userData.country = $('#country').val();
        if(!userData.country) { // 未选择出行地点
            showAlert("未选择出行地点");
            return;
        }

        // 设置国旗
        var flag = '<svg class="icon svg-icon" aria-hidden="true"><use xlink:href="#icon-'+countryList[userData.country]+'"></use></svg>';
        $('.flow_1 .flag').append(flag);
        $('.flow_1 .name').html(userData.country);
        // ....... 其它操作，改变保险跳转链接等

        // 初始化时间选择器
        new calendar(".calendar", {
            checkCalender: true,
            callback : function (startDate, endDate) {
                console.log(startDate, endDate)
                userData.startDate = startDate;
                userData.endDate = endDate;
            }
        });

        // 跳转至选择时间选择界面
        $('.index_page').hide();
        $('.flow_page').removeClass('hidden');
        $('.flow_1').removeClass('hidden');
    });

    // 选择好时间后点击下一步
    $('.flow_1').on('click','.btn_next', function () {
        if(!userData.startDate) {
            // 提示未填写开始时间
            showAlert("未选择开始时间");
            return;
        }
        if(!userData.endDate) {
            // 提示未填写结束时间
            showAlert("未选择结束时间");
            return;
        }
        if(userData.startDate && userData.endDate) {
            if(new Date(userData.endDate) - new Date(userData.startDate) > 7*24*60*60*1000) {
                showAlert("行程超过7天，免费赠送只涵盖7天行程");
                return;
            }
        }
        $('.flow_1').hide();
        $('.flow_2').removeClass('hidden');
    });

    // 填写出行人信息
    $('.follower .add').on('click', function () {
        $(this).toggleClass('open');
        $('.follower_info').slideToggle(300);
    });

    // 选择好时间后点击下一步
    $('.flow_2').on('click','.btn_next', function () {
        // 检测信息是否填写完整，并发送数据到后端
        // ... 通过后
        $('.flow_2').hide();
        $('.flow_3').show();
    });

    // 点击活动规则显示规则详情
    $('#showRule').on('click', function () {
        $('.flow_1').hide();
        $('.flow_rule').show();
    })
}