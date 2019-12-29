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


