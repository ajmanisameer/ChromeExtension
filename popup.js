document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("button").addEventListener("click", onclick, false);
});

var arr = [];
function onclick() {
  var arr = [];
  // alert("Grrrr")
  var x = document.getElementById("comment").value;
  // var p = document.createElement("H1")
  // var s = document.getElementById("saved")
  var node = document.createElement("li");
  var textNode = document.createTextNode(x);
  node.appendChild(textNode);
  document.getElementById("saved").appendChild(node);

  chrome.storage.local.set({ key: x }, function() {
    alert(x);
  });
}





function onAnchorClick(event) {
  chrome.tabs.create({ selected: true, url: event.srcElement.href });
  return false;
}

//build the URLs list and append it to the browser action popup
function buildPopupDom(divName, data) {
  var popupDiv = document.getElementById("popupHis");

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
