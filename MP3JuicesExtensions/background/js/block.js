// Path: /background/js/block.js
// Author: KONO Shizuku

!function () {
  'use strict';
  
  var REFERER_DOMAINS = [
    'mp3juices.to',
    'mp3juices.unblocked.pw'
  ];
  var AD_URLS = ['*://s.ad2387.com/*', '*://clkmon.com/*'];
  
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
      for (var i = 0; i < details.requestHeaders.length; ++i){
        var header = details.requestHeaders[i];
        
        for (var j = 0; j < REFERER_DOMAINS.length; ++j) {
          if (header.name == 'Referer' &&
              header.value.indexOf('//' + REFERER_DOMAINS[j]) > -1) // ドメイン一致
          {
            return { cancel: true };
          }
        }
      }
    },
    {
      urls: AD_URLS,
      types: ['script']
    },
    ['requestHeaders', 'blocking']
  );
}();