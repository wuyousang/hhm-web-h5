/**
 * @author qianqing
 * @create by 16-2-22
 * @description user controller
 */
require.config({
  baseUrl: '../js',
  paths: {
    'Vue': './lib/vue.min',
    'Utils': './lib/utils'
  },
  shim: {
    'Vue': {
      exports: 'Vue'
    },
    'Utils': {
      exports: 'Utils'
    }
  }
});

require(['Vue','Utils'],
  function (Vue, Utils) {
    'use strict';
    Vue.config.delimiters = ['${', '}'];
    Vue.config.unsafeDelimiters = ['{!!', '!!}'];

    $(document).on("pageInit", "#page-my", function (e, id, page) {
      var vm = new Vue({
        el: '#page-my',
        data: {}
      });

    });

    $(document).on("pageInit", "#page-my-account", function (e, id, page) {
      var vm = new Vue({
        el: '#page-my-account',
        data: {}
      });

      $(page).on('click', '#linkName', function () {
        location.href = '/users/change-shop-name';
      });

      $(page).on('click', '#linkType', function () {
        location.href = '/users/change-shop-style';
      });

      $(page).on('click', '#linkAddress', function () {
        location.href = '/users/my-address';
      });

      $(page).on('click', '#linkPassword', function () {
        location.href = '/users/change-password';
      });
    });

    $(document).on("pageInit", "#page-change-shop-name", function (e, id, page) {
      var vm = new Vue({
        el: '#page-change-shop-name',
        data: {}
      });

      $(page).on('click', '.button', function () {
        location.href = '/users/account';
      });

    });

    $(document).on("pageInit", "#page-change-shop-style", function (e, id, page) {
      var vm = new Vue({
        el: '#page-change-shop-style',
        data: {}
      });

      $(page).on('click', 'li a', function () {
        $('li a').removeClass('my-shop-active');
        $(this).addClass('my-shop-active');
        location.href = '/users/account';
      });

    });

    $(document).on("pageInit", "#page-change-password", function (e, id, page) {
      var vm = new Vue({
        el: '#page-change-password',
        data: {
          oldPW: '',
          newPW: '',
          rePW: ''
        },
        computed: {
          isDisable: function () {
            return this.oldPW.length === 0 || this.newPW.length === 0 || this.rePW.length === 0;
          }
        }
      });

      $(page).on('click', '.button', function () {
        if (!vm.oldPW) {
          $.toast("请输入旧密码", 1000);
          return;
        }

        if (!vm.newPW) {
          $.toast("请输入新密码", 1000);
          return;
        }

        if (!vm.rePW) {
          $.toast("请再次输入新密码", 1000);
          return;
        }

        if (vm.isDisable) {
          return;
        }
        $.toast("新密码设置成功！", 1000);
        window.history.back();
      });

    });

    $(document).on("pageInit", "#page-my-buy-report", function (e, id, page) {
      var dateTime = Utils.dateFormat(new Date(), 'yyyy-MM-dd');
      var vm = new Vue({
        el: '#page-my-buy-report',
        data: {
          start: dateTime,
          end: dateTime
        }
      });

      $(page).on('click', '.button', function () {
        $.router.load('/users/buy-report-result');
      });

      $("#my-start-time").calendar({
        value: [vm.start]
      });
      $("#my-end-time").calendar({
        value: [vm.end]
      });

    });

    $(document).on("pageInit", "#page-my-buy-report-result", function (e, id, page) {
      var vm = new Vue({
        el: '#page-my-buy-report-result',
        data: {
        }
      });

    });

    $(document).on("pageInit", "#page-my-fav", function (e, id, page) {
      var vm = new Vue({
        el: '#page-my-fav',
        data: {
          search: '',
          cartNum: 30
        }
      });

      $(page).on('click','.icon-clear', function () {
        vm.search = '';
      });

      $(page).on('click','.like', function () {
        $(this).toggleClass('icon-like');
        $(this).toggleClass('icon-likeactive');
        if ($(this).hasClass("icon-like")) {
          $(this).children('span').text('收藏');
        } else {
          $(this).children('span').text('已收藏');
        }
      });

      $(page).on('click','.icon-clear', function () {
        vm.search = '';
      });

      $(page).on('click','.button', function () {
        $.popup('.popup-cart');
      });

      var cartVm = new Vue({
        el: '#popup-cart',
        data: {
          addCartNum: 1
        }
      });

      cartVm.$watch('addCartNum', function (newVal, oldVal) {
        if (newVal === '') {
          return;
        }

        if (!Utils.isPositiveNum(newVal)) {
          $.toast('请输入正确的购买数量', 500);
          Vue.nextTick(function () {
            cartVm.addCartNum = oldVal;
          });
        }
      });

      $(document).on('click','.my-a-cart.close-popup', function () {
        if (cartVm.addCartNum === '') {
          cartVm.addCartNum = 1;
          $.toast('请输入正确的购买数量', 1000);
          e.preventDefault();
          return;
        }
        vm.cartNum += parseInt(cartVm.addCartNum);
        cartVm.addCartNum = 1;
      });

      $(document).on('click','.icon-close.close-popup', function () {
        cartVm.addCartNum = 1;
      });

      $(document).on('click','.em-op-d', function () {
        if (cartVm.addCartNum > 1) {
          cartVm.addCartNum--;
        }
      });

      $(document).on('click','.em-op-a', function () {
        cartVm.addCartNum++;
      });

      $(document).on('click','.my-ul-spec li', function () {
        $('.my-ul-spec li').removeClass('my-spec-on');
        $(this).addClass('my-spec-on');
      });

    });

    $(document).on("pageInit", "#page-my-message", function (e, id, page) {
      var vm = new Vue({
        el: '#page-my-message',
        data: {
        }
      });

      $(page).on('click', '.open-message-modal', function() {
        $.modal({
          title: '消息标题消息标题消息标题消息标题消息标题消息标题消息标题<span class="my-message-time">今天 09:45</span>',
          text: '<p>又到了周四大特卖！还在等什么呢！手快有，手慢无，赶紧抢货咯！又到了周四大特卖！还在等什么呢！手快有，手慢无，赶紧抢货咯！又到了周四大特卖！还在等什么呢！手快有，手慢无，赶紧抢货咯！<p>',
          extraClass: 'my-dialog',
          buttons: [
            {text: '<a href="#" class="icon icon-close my-black-text"></a>'}
          ]
        })
      });

    });

    $(document).on("pageInit", "#page-my-address", function (e, id, page) {
      var vm = new Vue({
        el: '#page-my-address',
        data: {
        }
      });

      $(page).on('click', '.label-checkbox', function() {
        $('.label-checkbox').contents().filter(function() {
          return this.nodeType === 3;
        }).text('设为默认');
        $(this).contents().filter(function() {
          return this.nodeType === 3;
        }).text('默认地址');
      });

    });

    $.init();
  }
);
