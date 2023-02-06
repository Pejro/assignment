function clickFunction(e) {
  if ($.login.value === "user" && $.password.value === "pass") {
    var win2 = Alloy.createController("secondWindow").getView();
    win2.open();
  } else {
    alert("Incorrect name or password!");
    $.password.value = "";
    $.login.value = "";
  }
}

function doClick(e) {
  alert($.label.text);
}

// $.btn1.addEventListener("click", doClick);
$.btn1.addEventListener("click", clickFunction);

$.index.open();
