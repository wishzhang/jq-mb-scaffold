/**
 * URL,IE10+
 */
var appUrl=(function (w,undefined) {

    var getParam = function () {
        var url = w.location.href;
        url = w.decodeURI(url);
        var paramStr = url.split('?')[1];
        if(!paramStr)return {};
        var paramArr = paramStr.split('&');
        var paramsObj = {};
        for (var i = 0; i < paramArr.length; i++) {
            var param = paramArr[i].split('=');
            paramsObj[param[0]] = param[1];
        }
        return paramsObj;
    };

    var paramToStr = function (obj) {
        var str = '';
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                str += key + '=' + obj[key] + '&';
            }
        }
        str = str.substring(0, str.length - 1);
        return str;
    };

    var navigateTo=function (obj) {
        var url=obj.url;
        if(url){
            w.location.href=url;
        }
    };

    var replaceTo=function (obj) {
        var url=obj.url;
        if(url){
            //w.history.replaceState({},'',url);
            //w.location.href=url;
            w.location.replace(url);
        }
    };

    return{
        navigateTo:navigateTo,
        replaceTo:replaceTo,
        getParam: getParam,
        paramToStr: paramToStr
    }
})(window);

/**
 * 时间转换
 */
;(function () {
    var formatMode = {};

    var defaultModeFun = function () {
        //this指向date
        var self = this;
        var getYear = function () {
            return self.getFullYear();
        };

        var getMonth = function () {
            var m = self.getMonth() + 1;
            if (m < 10) {
                return '0' + m;
            }
            return m;
        };

        var getDay = function () {
            var d = self.getDay() - 1;
            if (d < 10) {
                return '0' + d;
            }
            return d;
        };

        return {
            getYear: getYear,
            getMonth: getMonth,
            getDay: getDay
        };
    };

    Date.prototype.format = function (mode) {
        if (!mode) {
            return defaultModeFun.call(this);
        }
    };
})();

/**
 * 标题栏
 */
$(function () {
    $('.app-header .left img:first-child').click(function () {
        window.history.back();
    })
});

/**
 * 吐司
 */
;(function ($, undefined) {
    $.appToast = function (options) {
        var settings = $.extend({
            text: "<a href='#'>默认信息</a>",
            showHideTransition: 'fade',  // It can be plain, fade or slide
            bgColor: 'rgba(0,0,0,0.7)',              // Background color for toast
            textColor: '#eee',            // text color
            allowToastClose: false,       // Show the close button or not
            hideAfter: 3000,              // `false` to make it sticky or time in miliseconds to hide after
            stack: 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign: 'center',            // Alignment of text i.e. left, right, center
            position: 'top-center',       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            loader: false
        }, options);
        $.toast(settings);
    };
})(jQuery);

/**
 * 弹框
 */
;$(function () {

    var AppConfirm = (function () {
        var WsConfirmFun = function () {
        };

        var getTemplate = function (obj) {
            var tpl =
                '<div class="app-confirm">\n' +
                '    <div class="warn-box">\n' +
                '        <div class="vb-title">' + obj.title + '</div>\n' +
                '        <div class="msg">' + obj.msg + '</div>\n' +
                '        <div class="footer">\n' +
                '            <span>取消</span>\n' +
                '            <span>确定</span>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            return tpl;
        };

        //fixed
        var top = 0;
        var canBgScroll = function (isScroll) {
            var bodyEl = $('body')[0];
            if (!isScroll) {
                top = window.scrollY || window.pageYOffset;
                bodyEl.style.position = 'fixed';
                bodyEl.style.top = -top + 'px';
            } else {
                bodyEl.style.position = '';
                bodyEl.style.top = '';
                window.scrollTo(0, top);
            }
        };

        var removeAllConfirmView = function () {
            $('body').find('.app-cover-box').remove();
        };

        var addConfirmView = function ($tpl) {
            removeAllConfirmView();
            $('body').append($tpl);
            canBgScroll(false);
        };

        WsConfirmFun.prototype.init = function (option) {
            this.opt = option;
            return this;
        };

        WsConfirmFun.prototype.render = function () {
            var self = this;
            var tpl = getTemplate(this.opt);
            var $tpl = $(tpl);

            if (this.opt.cancelEnable) {
                $tpl.find('span:first-child').click(function () {
                    removeAllConfirmView();
                    canBgScroll(true);
                    self.opt.cancelClick();
                })
            } else {
                $tpl.find('span:first-child').css('display', 'none');
            }

            if(this.opt.titleEnable){

            }else{

            }

            $tpl.find('span:last-child').click(function () {
                removeAllConfirmView();
                canBgScroll(true);
                self.opt.confirmClick();
            });

            addConfirmView.call(self, $tpl)
        };

        return WsConfirmFun;
    })();

    $.appConfirm = function (options) {
        var settings = $.extend({
            title: '标题',
            msg: '消息',
            titleEnable:true,
            cancelEnable: true,
            cancelClick: function () {
                console.log('点击了取消按钮');
            },
            confirmClick: function () {
                console.log('点击了确定按钮');
            }
        }, options);
        new AppConfirm().init(settings).render();
    };
});

/**
 空视图
 */
var AppEmptyView = (function () {
    var VbEmptyViewFun = function () {
    };

    VbEmptyViewFun.prototype.init = function (option) {
        this.opt = option;
        this.opt.errMsg = this.opt.errMsg || '暂无相关数据~';
        return this;
    };

    VbEmptyViewFun.prototype.render = function () {
        var $el = $(this.opt.el);
        var errMsg = this.opt.errMsg;
        var $tpl = $(
            '<div class="app-empty">\n' +
            '        <img src="../../img/plugin/empty.png" alt="empty.png">\n' +
            '        <span>' + errMsg + '</span>\n' +
            '</div>'
        );
        if (this.opt.color) {
            $tpl.find('span').css('color', this.opt.color);
        }
        $el.replaceWith($tpl);
        return this;
    };

    return VbEmptyViewFun;
})();

/**
 五颗星
 */
var AppStars = (function () {
    var VbStarFun = function () {
    };

    VbStarFun.prototype.init = function (option) {
        var setting = $.extend({
            enable: true
        }, option);
        this.opt = setting;
        return this;
    };

    VbStarFun.prototype.render = function () {
        var self = this;
        var $el = $(this.opt.el).empty();

        return $el.each(function (ind, ele) {
            var $tpl = $(
                '<div class="app-stars">\n' +
                '      <img src="../../img/plugin/star.png" alt="star.png">\n' +
                '      <img src="../../img/plugin/star.png" alt="star.png">\n' +
                '      <img src="../../img/plugin/star.png" alt="star.png">\n' +
                '      <img src="../../img/plugin/star.png" alt="star.png">\n' +
                '      <img src="../../img/plugin/star.png" alt="star.png">\n' +
                '</div>'
            );
            if (self.opt.enable) {
                $tpl.find('img').each(function (ind, ele) {
                    $(this).click(function (e) {
                        /*                        $tpl.find('img').attr('src', '../../img/mine/order/star.png');
                                                $tpl.find('img:nth-of-type(-1n+' + (ind + 1) + ')')
                                                    .attr('src', '../../img/mine/star-selected.png');
                                                console.log((ind + 1) + '颗星');*/
                        self.setStar($tpl,ind+1);
                    });
                });
            }
            $(this).append($tpl);
        });
    };

    VbStarFun.prototype.setStar = function (el,num) {
        $(el).find('img').attr('src', '../../img/plugin/star.png');
        $(el).find('img:nth-of-type(-1n+' + num + ')')
            .attr('src', '../../img/plugin/star-selected.png');
        console.log(num + '颗星');
    };

    return VbStarFun;
})()

/**
 * 搜索框
 */
var AppSearchBox=(function () {

    var WsSearchBoxFun=function () {

    }

    var getTemplate=function(obj){
        var tpl=
            '<div class="vb-search-box">\n' +
            '        <div class="input-box">\n' +
            '            <img src="../../img/plugin/search.png" alt="search.png">\n' +
            '            <input type="text" placeholder='+obj.placeholder+'>\n' +
            '        </div>\n' +
            '        <a href="#" class="btn-search">搜索</a>\n' +
            '</div>'
        return tpl
    }

    WsSearchBoxFun.prototype.init=function (option) {
        this.opt=option
        this.opt.placeholder=this.opt.placeholder||'';
        this.opt.searchClick=this.opt.searchClick||function(){};
        return this;
    }

    WsSearchBoxFun.prototype.render=function () {
        var self=this
        var $el=$(this.opt.el)
        var tpl=getTemplate(this.opt)
        var $tpl=$(tpl)
        $tpl.find('.btn-search').click(function () {
            var inputValue=$tpl.find('input').val()
            self.opt.searchClick(inputValue)
        })
        $el.append($tpl)
    }

    return WsSearchBoxFun
})();

/**
 * 视频列表
 *
 new WsVideoGroup().init({
    el: '#video-group',
    data: [{
        id: '0',
        title: '耀眼新品，精彩揭晓——蓝莓胶囊鲜活面膜的成功蓝莓胶囊鲜活面\n' +
            '                    膜的成功蓝莓胶囊鲜活面膜的成功',
        posterUrl: '//vjs.zencdn.net/v/oceans.png',
        src: '//vjs.zencdn.net/v/oceans.mp4',
        playNum: 1,
        commentNum: 2,
        praiseNum: 3,
        itemClickEnable: true,
        itemClick: function (params) {

        },
        praiseClickEnable: true,
        praiseClick: function (el,tar) {
            if($(el).css('color')!=='#ef4a09'){
                $(el).css('color','#ef4a09')
                $(tar).text(this.praiseNum+1)
            }
        }
    }]
}).render()
 */
var AppVideoList = (function () {

    var getTemplate = function (obj) {

        var $template = $(
            '<li class="app-video-list-item">\n' +
            '            <div class="avatar-video">\n' +
            '                <video\n' +
            '                        style="width:100%;height:100%;object-fit: fill;"\n' +
            '                        controls\n' +
            '                        preload="auto"\n' +
            '                        poster="' + obj.posterUrl + '"\n' +
            '                        src=' + obj.src + '>\n' +
            '                    <p>当前环境不支持video标签。</p>\n' +
            '                </video>\n' +
            '            </div>\n' +
            '            <div class="footer">\n' +
            '                <p>' + obj.title +
            '               </p>\n' +
            '                <div class="con-num" ' + '>\n' +
            '                    <i class="iconfont icon-ooplay"></i>\n' +
            '                    <span>' + obj.playNum + '</span>\n' +
            '                    <i class="iconfont icon-edit"></i>\n' +
            '                    <span>' + obj.commentNum + '</span>\n' +
            '                    <i class="iconfont icon-good"></i>\n' +
            '                    <span>' + obj.praiseNum + '</span>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </li>'
        );

        if (obj.itemClickEnable) {
            $template.find('.con-num').click(function () {
                obj.itemClick(obj);
            });
        }

        if (obj.praiseClickEnable) {
            var $prise = $template.find('.icon-good');
            var $tar = $prise.find('+ span');
            $prise.click(function () {
                obj.praiseClick(this, $tar);
            });
        }

        return $template;
    };

    var defaultItemSetting = {
        id: '0',
        title: '',
        posterUrl: '',
        src: '',
        playNum: 0,
        commentNum: 0,
        praiseNum: 0,
        itemClickEnable: true,
        itemClick: function () {
        },
        praiseClickEnable: true,
        praiseClick: function () {
        }
    };

    var VideoGroupFun = function (option) {
    };

    VideoGroupFun.prototype.init = function (option) {
        this.$root = $(option.el);
        this.data = option.data;
        return this;
    };

    VideoGroupFun.prototype.render = function () {
        var $ul = $('<ul class="app-video-list"></ul>').appendTo(this.$root);
        var list = [];
        for (var i = 0; i < this.data.length; i++) {
            var setting = $.extend(defaultItemSetting, this.data[i]);
            var $tpl = getTemplate(setting);
            list.push($tpl);
        }
        $ul.append(list);
    };
    return VideoGroupFun;
})();

/**
 * 发送框
 */
var AppSendBox = (function () {

    var WsSendBoxFun = function () {
    };

    WsSendBoxFun.prototype.init = function (option) {
        this.option = option;
        return this;
    };

    var getTemplate = function (opt) {
        var tpl =
            '<div class="app-comment-send">\n' +
            '        <input id="comment-input" type="text" placeholder="在此处写上您的评论"></input>\n' +
            '        <div>\n' +
            '            <button id="comment-send">发送</button>\n' +
            '        </div>\n' +
            '</div>';

        return tpl;
    };

    var bind = function () {
        $('#comment-send').click(function () {
            var comment = $.trim($('#comment-input').val());
            if (comment.length === 0) {
                $.appToast({text: '评论为空~'});
            } else {
                $.appToast({text: '您的评论已提价，正等待审核~'});
                $('#comment-input').val('');
            }
        });
    };

    WsSendBoxFun.prototype.render = function () {
        var $root = $(this.option.el);

        var tpl = getTemplate();
        $root.append(tpl);

        bind();
    };

    return WsSendBoxFun;

})();

/**
 * 评论列表
 */
var AppCommentList = (function () {

    var commentGoodClickFun = function (obj, el, tar) {
        var $el = $(el);
        var $tar = $(tar);
        if ($el.hasClass('good-clicked')) {
            $.appToast({text: '您已经点过赞了~'});
        } else {
            $el.addClass('good-clicked');
            $tar.text(obj.goodNum + 1);
        }
    };

    var getItemTemplate = function (opt) {
        var tpl =
            '<li>\n' +
            '                <img src="' + opt.avatarUrl + '" alt="' + opt.avatarUrl + '">\n' +
            '                <div class="right">\n' +
            '                    <div>\n' +
            '                        <span>' + opt.name + '</span>' +
            '                    </div>\n' +
            '                    <p>' + opt.comment + '</p>\n' +
            '                    <div class="footer"><span>' + opt.createTime + '</span>' +
            '                           <div><i class="iconfont icon-good"></i><span>' + opt.goodNum + '</span></div>' +
            '                           </div>' +
            '                </div>\n' +
            '</li>';
        return tpl;
    };

    var WsCommentListFun = function () {

    };

    WsCommentListFun.prototype.init = function (option) {
        this.option = option;
        return this;
    };

    WsCommentListFun.prototype.render = function () {
        var $root = $(this.option.el);
        var data = this.option.data;
        var self = this;

        var list = [];
        for (var i = 0; i < data.length; i++) {
            ;(function (ind) {
                var tpl = getItemTemplate(data[ind]);
                var $tpl = $(tpl);
                $tpl.find('.footer i').click(function () {
                    /*      data[ind].goodClick=data[ind].goodClick||function () {
                          }*/
                    commentGoodClickFun(data[ind], this, $tpl.find('.footer >div span')[0]);
                });
                list.push($tpl);
            })(i);
        }

        var $listTemplate = $(
            '<div class="app-comment-list">\n' +
            '        <h3>评论列表(' + data.length + ')</h3>\n' +
            '        <ul>\n' +
            '        </ul>\n' +
            '</div>'
        );

        $listTemplate.find('ul').append(list);

        $root.append($listTemplate);
    };

    return WsCommentListFun;
})();