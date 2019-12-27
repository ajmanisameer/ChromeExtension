'use strict';
// $("#saveChanges").click(function(){
//     var text = $.trim($(".textArea").val());
//     console.log(text);
// })

// var text = $(".textArea").val()
// console.log(text)
// console.log($(".textArea").val());


// document.addEventListener('')
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
})



function onclick() {
    // alert("Grrrr")
    var x = document.getElementById("comment").value
    // var p = document.createElement("H1")
   // var s = document.getElementById("saved")
   var node = document.createElement("LI");
   var textNode = document.createTextNode(x);
   node.appendChild(textNode);
   document.getElementById("saved").appendChild(node)
    

    // p.appendChild(t)
    
    
}


    // var text = document.getElementById('comment').value;
    // let save = document.getElementById("saveChanges")

    // console.log(text)
