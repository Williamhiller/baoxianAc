(function (global, undefind) {
    'use strict';
    var calendar = function (element, options) {
        var _this = this;
        _this.myDate = new Date();
        _this.newDate = _this.myDate.getDate();
        _this.newDay = _this.myDate.getDay();
        _this.newMonth = _this.myDate.getMonth();
        _this.newFullYear = _this.myDate.getFullYear();
        options = options || {};
        var defaults = {
            calenderScroll: false,
            checkCalender: false,
            topcalendarTop: options.calendarTop || '38px',
            beforeToday: true,
            afterToday: false,
            callback : null
        };
        _this._element = $(element);
        _this._options = $.extend({}, defaults, options);
        _this._element.show();
        _this.init();
    };
    calendar.prototype.init = function () {
        var _this = this;
        _this._element.html('');
        for (var i = 0; i < 1; i++) {
            _this.newMonth++
            if (_this.newMonth > 11) {
                _this.newMonth = 0;
                _this.newFullYear += 1;
            }
            this._element.append(_this.calendarCon(_this.newFullYear, _this.newMonth));
        }
        if (!_this._options.checkCalender) {
            _this._element.css({
                'top': _this._options.topcalendarTop
            })
        }
        _this.calendarConter();
        _this.calendarClick();
    }
    calendar.prototype.calendarCon = function (newYears, newMonths) {
        var _this = this;
        var oldDate = new Date(newYears, newMonths);
        var calendarList;
        oldDate.setMonth(newMonths);
        oldDate.setDate(0);
        var newDayNum = oldDate.getDate(0);
        oldDate.setDate(1);
        var emptyAll = oldDate.getDay();
        if (_this.newMonth == 0) {
            newYears -= 1;
        }
        newMonths = newMonths == 0 ? 12 : newMonths;
        newMonths = newMonths > 9 ? newMonths : '0' + newMonths;
        if (_this._options.checkCalender) {
            calendarList = '<div class="dateTimeInput">' +
                '<input type="text" placeholder="请输入日期" />' +
                '</div>';
            calendarList += '<div class="calendar-btn"><p>' +
                '<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
                '<a class="leftbtn ml5" href="javascript:;">&lt;</a>' +
                '</p>';
        } else {
            calendarList = '<div class="calendar-btn"><p>' +
                '<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
                '<a class="leftbtn ml5" href="javascript:;">&lt;</a>' +
                '</p>';
        }
        calendarList += '<h3>' + newYears + '年' + newMonths + '月</h3>';
        calendarList += '<p>' +
            '<a class="rightbtn" href="javascript:;">&gt;</a>' +
            '<a class="rightbtnYear ml5" href="javascript:;">&gt;&gt;</a>' +
            '</p></div>';
        calendarList += '<ol class="title">' +
            '<li>日</li>' +
            '<li>一</li>' +
            '<li>二</li>' +
            '<li>三</li>' +
            '<li>四</li>' +
            '<li>五</li>' +
            '<li>六</li>' +
            '</ol>';
        calendarList += '<div class="content"><div class="list">';
        calendarList += '<ul>';
        if (emptyAll > 0) {
            for (var j = 0; j < emptyAll; j++) {
                calendarList += ('<li></li>');
            }
        }
        if ((_this.myDate.getMonth() + 1) == newMonths && _this.myDate.getFullYear() == newYears) {
            for (var i = 1; i <= newDayNum; i++) {
                var days = i > 9 ? i : '0' + i;
                if (i < _this.newDate) {
                    if (_this._options.beforeToday) {
                        calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" class="disabled" >' + days + '</li>');
                    } else {
                        calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
                    }
                } else if (i == _this.newDate) {
                    calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '"   >' + days + '</li>');
                } else {
                    if (_this._options.afterToday) {
                        calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" class="disabled" >' + days + '</li>');
                    } else {
                        calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
                    }
                }
            }
        } else {
            for (var i = 1; i <= newDayNum; i++) {
                var days = i > 9 ? i : '0' + i;
                if((_this.myDate.getMonth() + 1) > parseInt(newMonths) && _this.myDate.getFullYear() >= newYears && _this._options.beforeToday) {
                    calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '"  class="disabled" >' + days + '</li>');
                }else {
                    calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
                }
            }
        }
        calendarList += '</ul>' +
            '</div></div>';
        if (_this._options.checkCalender) {
            calendarList += '<div class="bottom-btn">' +
                '<a  class="sure-btn disabled" href="javascript:;">确定</a>' +
                '</div>';
        }
        $(".calendar .calendar-btn h3").html(newYears + "年" + newMonths + "月")
        return calendarList;
    };
    calendar.prototype.calendarConter = function () {
        var _this = this;
        if (_this._options.calenderScroll) {
            _this._element.find('content').on("resize scroll", function () {
                var windowHeight = _this._element.find('content').height();
                var scrollTop = _this._element.find('content').scrollTop();
                var docHeight = _this._element.find(".content .list").height() * _this._element.find(
                    ".content .list").length;
                if ((scrollTop + windowHeight - 20) >= docHeight) {
                    monthNum++;
                    for (var i = 0; i < monthNum; i++) {
                        newMonth++
                        if (newMonth > 11) {
                            newMonth = 0;
                            newFullYear += 1;
                        }
                        _this._element.find(".content").append(calendarCon(newFullYear, newMonth))
                    }
                }
            });
        }
    }
    calendar.prototype.calendarClick = function () {
        var _this = this;
        var newMonth = _this.myDate.getMonth() + 1;
        let startCalender = '';
        let endCalender = '';
        let clickNum = 0;
        _this._element.on('click', ' .calendar-btn a', function () {
            if ($(this).hasClass('rightbtn')) {
                _this.newMonth++;
            } else if ($(this).hasClass('leftbtn')) {
                _this.newMonth--;
            } else if ($(this).hasClass('rightbtnYear')) {
                _this.newFullYear++;
            } else if ($(this).hasClass('leftbtnYear')) {
                _this.newFullYear--;
            }
            if (_this.newMonth > 11) {
                _this.newMonth = 0;
                _this.newFullYear += 1;
            } else if (_this.newMonth < 0) {
                _this.newMonth = 11;
                _this.newFullYear -= 1;
            };
            _this._element.html('');
            _this._element.append(_this.calendarCon(_this.newFullYear, _this.newMonth));
            if (clickNum == 1) {
                // _this._element.find('.content .list ul li').hover(function () {
                //     endCalender = $(this).attr('_date');
                //     checkCalenders();
                // })
            } else {
                checkCalenders();
            }
            compareDate();
        })

        function getAllDate(day1, day2) {
            var getDate = function (str) {
                var tempDate = new Date();
                var list = str.split("-");
                tempDate.setFullYear(list[0]);
                tempDate.setMonth(list[1] - 1);
                tempDate.setDate(list[2]);
                return tempDate;
            }
            var date1 = getDate(day1);
            var date2 = getDate(day2);
            var dateArr = [];
            var i = 0;
            if (day1 != day2) {
                if (date1 > date2) {
                    var tempDate = date1;
                    date1 = date2;
                    date2 = tempDate;
                }
                date1.setDate(date1.getDate() + 1);
                while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() &&
                    date1.getDate() == date2.getDate())) {
                    var dayStr = date1.getDate().toString();
                    if (dayStr.length == 1) {
                        dayStr = "0" + dayStr;
                    }
                    var monthStr = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : date1.getMonth() +
                        1;
                    dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" +
                        dayStr;
                    i++;
                    date1.setDate(date1.getDate() + 1);
                }
                dateArr.splice(0, 0, day1);
                dateArr.push(day2);
            } else {
                dateArr.push(day1)
            }
            return dateArr;
        }

        function checkCalenders() {
            if (startCalender && endCalender) {
                let getAllCalender = [];
                getAllCalender = getAllDate(startCalender, endCalender);
                _this._element.find('.content .list ul li').removeClass('hover endDate')
                getAllCalender.sort(function (a, b) {
                    return new Date(a) - new Date(b)
                });
                if(getAllCalender.length < 2) {
                    return;
                }
                _this._element.find('.content .list ul li').each(function () {
                    var _date = $(this).attr("_date");
                    if (getAllCalender.indexOf(_date) === 0) {
                        startCalender = _date;
                        $(this).removeClass('first').addClass('startDate');
                        $(this).append('<span>出发</span>')
                    } else if (getAllCalender.indexOf(_date) === getAllCalender.length - 1) {
                        endCalender = _date;
                        $(this).find('span').remove();
                        $(this).removeClass('first').addClass('endDate');
                        $(this).append('<span>返回</span>')
                    }else if (getAllCalender.indexOf(_date) !== -1) {
                        $(this).addClass('hover');
                    }else {
                        $(this).removeClass('first').removeClass('startDate').removeClass('endDate');
                    }
                })
                getAllCalender.forEach((item) => {

                })
            }
        }

        function compareDate() {
            let startTime = new Date(Date.parse(startCalender));
            let endTime = new Date(Date.parse(endCalender));
            if (clickNum == 2) {
                if (startTime < endTime) {
                    _this._element.find('.dateTimeInput input').val(startCalender + ' ~ ' + endCalender)
                } else {
                    _this._element.find('.dateTimeInput input').val(endCalender + ' ~ ' + startCalender)
                }
            }
        }
        _this._element.on('click', ' .content .list ul li', function () {
            var that = $(this);
            if (!$(this).hasClass('disabled') && $(this).html() != '') {
                if (_this._options.checkCalender) {
                    clickNum++;
                    if (clickNum == 1) {
                        // that.addClass('startDate');
                        that.addClass('first');
                        $(this).append('<span>出发</span>')
                        startCalender = that.attr('_date');
                        // $(this).parent('ul').children('li').hover(function () {
                        //     endCalender = $(this).attr('_date');
                        //     checkCalenders();
                        // })
                        _this._element.find('.bottom-btn .sure-btn').addClass('disabled')
                        _this._element.find('.dateTimeInput input').val('')
                    } else if (clickNum == 2) {
                        endCalender = that.attr('_date');
                        that.addClass('endDate');
                        checkCalenders();
                        compareDate();
                        _this._element.find('.bottom-btn .sure-btn').removeClass('disabled')
                        // $(this).parent('ul').children('li').off('mouseenter').unbind('mouseleave');
                    } else if (clickNum == 3) {
                        clickNum = 1;
                        startCalender = that.attr('_date');
                        endCalender = ''
                        $(this).parent('ul').children('li').each(function () {
                            $(this).find('span').remove();
                            $(this).removeClass('hover').removeClass('startDate').removeClass('endDate');
                        })
                        $(this).append('<span>出发</span>')
                        that.addClass('first');
                        // $(this).parent('ul').children('li').hover(function () {
                        //     endCalender = $(this).attr('_date');
                        //     checkCalenders();
                        // })
                        _this._element.find('.bottom-btn .sure-btn').addClass('disabled')
                        _this._element.find('.dateTimeInput input').val('')
                    }
                    if(_this._options.callback) {
                        _this._options.callback(startCalender, endCalender)
                    }
                } else {
                    _this._element.hide();
                    $(this).css('border-radius', '3px');
                    $(this).addClass('active').siblings().removeClass('active');
                    _this._element.siblings('input').val($(this).attr('_date'));
                }
            }
        });
        _this._element.on('click', '.bottom-btn .sure-btn', function () {
            if (!$(this).hasClass('disabled')) {
                _this._element.siblings('input').val(_this._element.find('.dateTimeInput input').val());
                _this._element.hide();
            }
        })
    }
    global.calendar = calendar;
})(window);
