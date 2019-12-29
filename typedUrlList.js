document.addEventListener('DOMContentLoaded', function(){
    typedUrlList("popupHistory")
})


//when click the link it will open ona new tab
function onAnchorClick(event) {
    chrome.tabs.create({ selected: true, url: event.srcElement.href });
    return false;
  }
  
  //creating a popup menu to show the typed links so that user can open it
  function buildPopupDom(popupHistory, data) {  
    var popupDiv = document.getElementById("popupHistory");
  
    var ul = document.createElement("ul");
    popupDiv.appendChild(ul);
  
    for (var i = 0, ie = data.length; i < ie; ++i) {
      var a = document.createElement("a");
      a.href = data[i];
      a.appendChild(document.createTextNode(data[i]));
      a.addEventListener("click", onAnchorClick);
  
      var li = document.createElement("li");
      li.appendChild(a);
  
      ul.appendChild(li);
    }
  }
  


  function typedUrlList(popupHistory) {
    var microSecondPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - microSecondPerWeek;
  
    var numRequestsOutstanding = 0;
  
    chrome.history.search({ text: "", startTime: oneWeekAgo }, function(
      historyItem
    ) {
      for (var i = 0; i < historyItem.length; ++i) {
        var url = historyItem[i].url;
        var visitsWithUrl = function(url) {
          return function(visitItems) {
            processVisits(url, visitItems);
          };
        };
        chrome.history.getVisits({ url: url }, visitsWithUrl(url));
        numRequestsOutstanding++;
      }
      if (!numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
    });
  
    var urlToCount = {};
    var processVisits = function(url, visitItems) {
      for (i = 0; i < visitItems.length; ++i) {
        if (visitItems[i].transition != "typed") {
          continue;
        }
        if (!urlToCount[url]) {
          urlToCount[url] = 0;
        }
        urlToCount[url]++;
      }
  
      if (!--numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
    };
  
    var onAllVisitsProcessed = function() {
      urlArray = [];
      for (var url in urlToCount) {
        urlArray.push(url);
      }
  
      urlArray.sort(function(a, b) {
        return urlToCount[b] - urlToCount[a];
      });
      buildPopupDom(popupHistory, urlArray.slice(0, 10));
    };
  }
  