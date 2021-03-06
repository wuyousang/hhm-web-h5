/**
 * @author qianqing
 * @create by 16-2-15
 * @description index page controller
 */
require.config({
  baseUrl: './js',
  paths: {
    'Vue': './lib/vue.min'
  },
  shim: {
    'Vue': {
      exports: 'Vue'
    }
  }
});

require(['Vue'],
  function (Vue) {
    'use strict';
    Vue.config.delimiters = ['${', '}'];
    Vue.config.unsafeDelimiters = ['{!!', '!!}'];

    $(document).on("pageInit", "#page-index", function (e, id, page) {
      var vm = new Vue({
        el: '#page-index',
        data: {
          search: '',
          hour: '02',
          min: '00',
          sec: '00'
        }
      });

      var time = 2 * 3600 * 1000;


      var killInterval = setInterval(function () {
        var hour = Math.floor((time % 86400000) / 3600000);
        var min = Math.floor(((time % 86400000) % 3600000) / 60000);
        var sec = Math.floor(((time % 86400000) % 3600000 % 60000) / 1000)
        vm.hour = hour > 9 ? hour : '0' + hour;
        vm.min = min > 9 ? min : '0' + min;
        vm.sec = sec > 9 ? sec : '0' + sec;

        if (hour === 0 && min === 0 && sec === 0) {
          clearInterval(killInterval);
        } else {
          time -= 1000;
        }
      }, 1000);

      $(page).on('click', '.icon-clear', function () {
        vm.search = '';
      });

      $(function () {
        $(".swiper-container").swiper({
          spaceBetween: 30,
          continuous: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false
        });
      });
    });

    $(document).on("pageInit", "#page-login", function (e, id, page) {
      var vm = new Vue({
        el: '#page-login',
        data: {
          phone: '',
          password: ''
        },
        computed: {
          isDisable: function () {
            return this.phone.length === 0 || this.password.length === 0;
          }
        }
      });

      $(page).on('click', '#login', function () {
        if (!vm.phone) {
          $.toast("请输入手机号", 1000);
          return;
        }

        if (!vm.password) {
          $.toast("请输入密码", 1000);
          return;
        }

        if (vm.isDisable) {
          return;
        }

        location.href = '/index';
      });

      $(window).resize(function () {
        $('.content').scrollTop($(window).height());
      });
    });

    $(document).on("pageInit", "#page-choose-shop-style", function (e, id, page) {
      var vm = new Vue({
        el: '#page-choose-shop-style',
        data: {}
      });
    });

    $(document).on("pageInit", "#page-register", function (e, id, page) {
      var vm = new Vue({
        el: '#page-register',
        data: {
          captchaTip: '获取验证码',
          isSendCaptcha: false,
          isDisable: true,
          captchaMsg: '',
          captcha: '',
          password: '',
          rePassword: '',
          phone: ''
        }
      });

      $(page).on('click', '#sendCaptcha', function () {

        if (vm.isSendCaptcha) {
          return;
        }

        if (!vm.phone) {
          $.toast("手机号不能为空");
          return;
        }

       /* $.post('http://120.27.148.53:30000/login/v1/Customers/get-captcha',{'phone': vm.phone,'type': '1'},function(res){
          //alert(res.repData.msg+'   '+res.repData.status);
          vm.isSendCaptcha=true;
        });*/

        $.ajax({
          type: 'POST',
          url: 'http://120.27.148.53:30000/login/v1/Customers/get-captcha',
          data: {
            'phone': vm.phone,
            'type': '1'
          }
        });

        var time = 60;
        vm.captchaTip = time + '秒';
        vm.isSendCaptcha = true;
        vm.isDisable = false;
        vm.captchaMsg = '如果您未收到短信，请在60秒后再次获取';
        var sendCaptchaInterval = setInterval(function () {
          time--;
          if (time > 9) {
            vm.captchaTip = time + '秒';
          } else {
            vm.captchaTip = '0' + time + '秒';
          }
          if (time === 0) {
            vm.captchaTip = '获取验证码';
            vm.isSendCaptcha = false;
            vm.isDisable = true;
            vm.captchaMsg = '';
            clearInterval(sendCaptchaInterval);
          }
        }, 1000);
      });

      $(page).on('click', '#submitReg', function () {
        if (!vm.isSendCaptcha) {
          return;
        }

        if (!vm.phone) {
          $.toast("手机号不能为空");
          return;
        }

        if (!vm.captcha) {
          $.toast("验证码不能为空");
          return;
        }

        if (!vm.password) {
          $.toast("密码不能为空");
          return;
        }

        if (vm.password != vm.rePassword) {
          $.toast("密码输入不一致");
          return;
        }
        location.href = "/register-complete";
      });

    });

    $(document).on("pageInit", "#page-register-complete", function (e, id, page) {
      var vm = new Vue({
        el: '#page-register-complete',
        data: {}
      });

      $("#city-picker").cityPicker({
        toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-right close-picker">确定</button>\
        <h1 class="title">选择收货地址</h1></header>'
      });

      $(page).on('click', '.button', function () {
        $.toast("恭喜您，注册成功！", 1000);
        location.href = '/index';
      });
    });

    $(document).on("pageInit", "#page-rest-password", function (e, id, page) {
      var vm = new Vue({
        el: '#page-rest-password',
        data: {
          captchaTip: '获取验证码',
          isSendCaptcha: false,
          isDisable: true,
          captchaMsg: '',
          captcha: '',
          password: '',
          rePassword: '',
          phone: '13758087094'
        }
      });

      $(page).on('click', '#sendCaptcha', function () {
        if (vm.isSendCaptcha) {
          return;
        }

        var time = 60;
        vm.captchaTip = time + '秒';
        vm.isSendCaptcha = true;
        vm.isDisable = false;
        vm.captchaMsg = '如果您未收到短信，请在60秒后再次获取';
        var sendCaptchaInterval = setInterval(function () {
          time--;
          if (time > 9) {
            vm.captchaTip = time + '秒';
          } else {
            vm.captchaTip = '0' + time + '秒';
          }
          if (time === 0) {
            vm.captchaTip = '获取验证码';
            vm.isSendCaptcha = false;
            vm.isDisable = true;
            vm.captchaMsg = '';
            clearInterval(sendCaptchaInterval);
          }
        }, 1000);
      });

      $(page).on('click', '#restPW', function () {
        if (!vm.isSendCaptcha) {
          return;
        }

        if (!vm.captcha) {
          $.toast("验证码不能为空");
          return;
        }

        if (!vm.password) {
          $.toast("密码不能为空");
          return;
        }

        if (vm.password != vm.rePassword) {
          $.toast("密码输入不一致");
          return;
        }

        $.toast("新密码设置成功！", 1000);
        location.href = '/';
      });

    });

    $.init();
  }
);
