$(function () {
    var loginObj = {
        init: function () {
            this.bindCheckBox();
            this.bindInputBox();
            this.bindLogin();
            this.bindTabs();
            this.bindWay();
        },
        bindCheckBox: function () {
            var self = this;
            $('.login-box .check-box > div').click(function () {
                var $this = $(this);
                if (!$this.hasClass('check-selected')) {
                    $this.addClass('check-selected');
                    self.formCheck();
                } else {
                    $this.removeClass('check-selected');
                    self.formCheck();
                }
            })
        },
        bindInputBox: function () {
            var self = this;
            $('.login-box .input-box:first-child img:last-child').click(function () {
                $('#account').val('');
                self.formCheck();
            });

            $('.login-box .eyes').click(function () {
                var $this = $(this);
                if ($this.hasClass('eyes-open')) {
                    $this.removeClass('eyes-open');
                    $('#password').attr('type', 'password');
                } else {
                    $this.addClass('eyes-open');
                    $('#password').attr('type', 'text');
                }
            })

            $("#account").bind('input porpertychange', function (e) {
                self.formCheck();
            });

            $("#password").bind('input porpertychange', function (e) {
                self.formCheck();
            });

            $('.dots-box').click(function () {
                $(this).hide();
                $('.way-box').show();
            })
        },
        enableLoginBtn: function () {
            $('.login-box .login-btn').css({'background': '#e019f8', 'opacity': 1})
            $('.login-box .login-btn').removeAttr('disabled')
        },
        disableLoginBtn: function () {
            $('.login-box .login-btn').css({'background': '#cccccc', 'opacity': 0.7})
            $('.login-box .login-btn').attr('disabled', 'disabled');
        },
        bindLogin: function () {
            var self = this;
            $('.login-box .login-btn').click(function () {
                self.login();
            });
        },
        bindTabs: function () {
            $('.reg-box').hide();
            $('.tabs-box span:first-child').click(function () {
                $('.tabs-box span').removeClass('tab-active');
                $(this).addClass('tab-active');
                $('.tab-content >div').hide();
                $('.login-box').show();
                $('footer').show();
            })

            $('.tabs-box span:last-child').click(function () {
                $('.tabs-box span').removeClass('tab-active');
                $(this).addClass('tab-active');
                $('.tab-content >div').hide();
                $('.reg-box').show();
                $('.reg-box').css('display','flex');
                $('footer').hide();
            })
        },
        bindWay:function(){
            $('.way-box >div:first img:nth-of-type(1)').click(function () {
                $.appToast({
                    text:'微信登录'
                })
            })

            $('.way-box >div:first img:nth-of-type(2)').click(function () {
                $.appToast({
                    text:'QQ登录'
                })
            })

            $('.way-box >div:first img:nth-of-type(3)').click(function () {
                $.appToast({
                    text:'微博登录'
                })
            })
        },

        formCheck: function () {
            var self = this
            var accountStr = $.trim($('#account').val());
            var regex=/^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
            var isCheckTel=regex.exec(accountStr)
            var pwdStr = $.trim($('#password').val());
            var isCheckBox = $('.login-box .check-box div').hasClass('check-selected');
            if (isCheckTel&& pwdStr.length >= 6 && isCheckBox) {
                self.enableLoginBtn()
            } else {
                self.disableLoginBtn()
            }
        },
        login: function () {
            $.appToast({text: '登录成功~'});
            $.cookie('login', '1', { expires: 7, path: '/' });
            appUrl.navigateTo({url:'../home/home-recommend.html'})
        },
    };
    var regObj = {
        init: function () {
            this.bindCheckBox();
            this.bindInputBox();
            this.bindReg();
            this.bindTabs();
            this.bindQrCode();
        },
        bindCheckBox: function () {
            var self = this;
            $('.reg-box .check-box > div').click(function () {
                var $this = $(this);
                if (!$this.hasClass('check-selected')) {
                    $this.addClass('check-selected');
                    self.formCheck();
                } else {
                    $this.removeClass('check-selected');
                    self.formCheck();
                }
            })
        },
        bindInputBox: function () {
            var self = this;
            $('.reg-box .img-del').click(function () {
                $('#reg-account').val('');
                self.formCheck();
            });

            $('.reg-box').find('.pwd-box:first').find('.eyes').click(function () {
                var $this = $(this);
                if ($this.hasClass('eyes-open')) {
                    $this.removeClass('eyes-open');
                    $('#reg-password').attr('type', 'password');
                } else {
                    $this.addClass('eyes-open');
                    $('#reg-password').attr('type', 'text');
                }
            })

            $('.reg-box .pwd-box:last').find('.eyes').click(function () {
                var $this = $(this);
                if ($this.hasClass('eyes-open')) {
                    $this.removeClass('eyes-open');
                    $('#reg-password-confirm').attr('type', 'password');
                } else {
                    $this.addClass('eyes-open');
                    $('#reg-password-confirm').attr('type', 'text');
                }
            })

            $("#reg-account").bind('input porpertychange', function (e) {
                self.formCheck();
            });

            $("#reg-password").bind('input porpertychange', function (e) {
                self.formCheck();
            });

            $("#qrcode").bind('input porpertychange', function (e) {
                self.formCheck();
            });

            $("#reg-password-confirm").bind('input porpertychange', function (e) {
                self.formCheck();
            });
        },
        enableLoginBtn: function () {
            $('.reg-box .login-btn').css({'background': '#e019f8', 'opacity': 1})
            $('.reg-box .login-btn').removeAttr('disabled')
        },
        disableLoginBtn: function () {
            $('.reg-box .login-btn').css({'background': '#cccccc', 'opacity': 0.7})
            $('.reg-box .login-btn').attr('disabled', 'disabled');
        },
        bindReg: function () {
            var self = this;
            $('.reg-box .login-btn').click(function () {
                self.register();
            });
        },
        bindTabs: function () {
            $('.reg-box').hide();
            $('.tabs-box span:first-child').click(function () {
                $('.tabs-box span').removeClass('tab-active');
                $(this).addClass('tab-active');
                $('.tab-content >div').hide();
                $('.login-box').show();
                $('footer').show();
            })

            $('.tabs-box span:last-child').click(function () {
                $('.tabs-box span').removeClass('tab-active');
                $(this).addClass('tab-active');
                $('.tab-content >div').hide();
                $('.reg-box').show();
                $('footer').hide();
            })
        },
        bindQrCode: function () {
            var self = this;
            $('#send-code').click(function () {
                self.sendQrCode();
            })
        },
        sendQrCode: function () {
            $.appToast({text: '已发送验证码~'});
            this.setDelayView();
        },
        setDelayView: function () {
            if (!$('#send-code').attr('disabled')) {
                $('#send-code').attr('disabled', 'disabled')
                $('#send-code').css('opacity', '0.7')
                var times = 3
                $('#send-code').text('还剩 ' + times + ' S')
                var timer = setInterval(function () {
                    times--
                    $('#send-code').text('还剩 ' + times + ' S')
                    if (times === 0) {
                        clearInterval(timer)
                        $('#send-code').removeAttr('disabled')
                        $('#send-code').text('获取验证码')
                        $('#send-code').css('opacity', '1')
                    }
                }, 1000)
            }
        },
        formCheck: function () {
            var self = this
            var accountStr = $.trim($('#reg-account').val());
            var pwdStr = $.trim($('#reg-password').val());
            var pwdConfirmStr = $.trim($('#reg-password-confirm').val());
            var qrcode = $.trim($('#qrcode').val());
            var isCheckBox = $('.reg-box .check-box div').hasClass('check-selected');
            if (accountStr.length === 11 && pwdStr.length >= 6 && isCheckBox
                && pwdConfirmStr === pwdStr && qrcode.length >= 4) {
                self.enableLoginBtn();
            } else {
                self.disableLoginBtn();
            }
        },
        register: function () {
            $.appToast({text: '点击注册~'})
        }
    };

    $('#reg-account').val('15216904030');
    $('#reg-password').val('123456')
    $('#reg-password-confirm').val('123456');
    $('#qrcode').val('1234');
    $('.reg-box .check-box >div').addClass('check-selected')
    regObj.formCheck();
    regObj.init();

    $('#account').val('15216904030');
    $('#password').val('123456')
    $('.login-box .check-box >div').addClass('check-selected')
    loginObj.formCheck();
    loginObj.init();

})