// Path: /content_scripts/js/search.js
// Author: KONO Shizuku

!function () {
  'use strict';
  
  var POOLING_INTERVAL = 10; // ms
  var DOWNLOAD_BUTTONS = '.action_buttons.download';
  var DOWNLOAD_URL     = 'input[name*=url]';
  var NEW_DOWNLOAD_BUTTON_ZINDEX = 1000;
  
  var onDomContentLoaded  = false;
  var downloadButtonCount = 0;
  
  // イベントキャンセルの処理
  var cancelEvent = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  
  // MP3 を直接ダウンロードする
  var downloadDirect = function (event) {
    cancelEvent(event);
    
    var url = $(this).closest('tr').find(DOWNLOAD_URL).val();
    location.href = url;
  };
  
  // ダウンロードボタンを作成する
  var createDownloadButtons = function (downloadButtons) {
    downloadButtons.each(function () {
      // 既に処理済みな場合
      if ($(this).attr('data-processed')) { return; }
      
      // 既存ボタンに被せるように要素を配置
      var newLink = $('<span />');
      
      newLink.css({
        display: 'block',
        position: 'absolute',
        width: $(this).width() + "px",
        height: $(this).height() + "px",
        margin: $(this).css('margin'),
        zIndex: NEW_DOWNLOAD_BUTTON_ZINDEX,
        cursor: 'pointer'
      });
      
      newLink.mousedown(cancelEvent);
      newLink.mouseup(cancelEvent);
      newLink.click(downloadDirect);
      
      // 要素を追加
      $(this).after(newLink);
      
      // 処理済みとしてマーク
      $(this).attr('data-processed', true);
    });
  };
  
  // ボタンのロード終了を待機する
  var checkButtonLoaded = function () {
    var downloadButtons = $(DOWNLOAD_BUTTONS);
    
    if (downloadButtons.length > 0) {
      // 前回からボタンの数が変化しているか調べる
      if (downloadButtons.length != downloadButtonCount) {
        downloadButtonCount = downloadButtons.length;
        createDownloadButtons(downloadButtons);
      }
      
      if (!onDomContentLoaded) {
        setTimeout(checkButtonLoaded, POOLING_INTERVAL);
      }
    }
    
    else {
      setTimeout(checkButtonLoaded, POOLING_INTERVAL);
    }
  };
  
  // ボタンの描画終了を取得
  checkButtonLoaded();
  
  // ボタン処理を中断する
  $(function () {
    onDomContentLoaded = true;
  });
}();