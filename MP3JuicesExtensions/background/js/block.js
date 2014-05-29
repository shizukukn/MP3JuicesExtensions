// Path: /background/js/block.js
// Author: KONO Shizuku

!function () {
  'use strict';
  
  var REFERER_FILTER = 'http://mp3juices.com/';
  var AD_URL = 'http://s.ad2387.com/*';
  
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
      for (var i = 0; i < details.requestHeaders.length; ++i){
        var header = details.requestHeaders[i];
        
        if (header.name == 'Referer' &&
            header.value.indexOf(REFERER_FILTER) === 0) // 前方一致
        {
          return { cancel: true };
        }
      }
    },
    {
      urls: [
        AD_URL
      ],
      types: ['script']
    },
    ['requestHeaders', 'blocking']
  );
}();