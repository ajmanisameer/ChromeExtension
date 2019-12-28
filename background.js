chrome.runtime.onInstalled.addListener(function() {
  console.log("ITS")
  
  chrome.storage.local.get(['key'], function(data) {
    
    //alert(data.key)
    console.log(data.key)
   })
});

