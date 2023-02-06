var xhr = require("xhr");
var args = $.args;
const buildNumber = Date.now();

function clickClose(e) {
  $.secondWindow.close();
}

var items, itemsFull;

function onSuccess(res) {
  res = JSON.parse(res);
  itemsFull = res;
  items = _.map(res, function (person) {
    // console.log(person);
    return {
      properties: {
        title: person.name,
        itemId: person.id,
        backgroundColor: "#fff",
        searchableText: person.name,
      },
    };
  });
  $.dataList.sections[0].setItems(items);
}

function onError(e) {
  console.log("failed to fetch the data", e);
}

function handleItemClick(e) {
  const detail = itemsFull[e.itemId - 1];

  // Display details
  var win = Ti.UI.createWindow({
    backgroundColor: detail.favourite_color,
    exitOnClose: true,
    fullscreen: false,
    layout: "vertical",
  });

  var image = Ti.UI.createImageView({
    image: detail.avatar,
    width: "250px",
  });

  var label1 = Ti.UI.createLabel({
    text: `Name: ${detail.name}`,
  });

  var label2 = Ti.UI.createLabel({
    text: `Email: ${detail.email}`,
  });

  var label3 = Ti.UI.createLabel({
    text: `Phone number: ${detail.phone_number}`,
  });

  var buttonBack = Titanium.UI.createButton({
    title: "←",
    fontSize: "32px",
    top: 10,
    width: 100,
    height: 50,
  });

  buttonBack.addEventListener("click", function (e) {
    var win2 = Alloy.createController("secondWindow").getView();
    win2.open();
  });

  win.add(buttonBack);
  win.add(image);
  win.add(label1);
  win.add(label2);
  win.add(label3);
  win.open();
}

function callNumber() {
  Titanium.Platform.openURL("tel:+421910460374");
}

function openEmail() {
  var emailDialog = Ti.UI.createEmailDialog();
  emailDialog.subject = "Hello from Titanium";
  emailDialog.toRecipients = ["repasky.patrik@gmail.com"];
  emailDialog.messageBody = "<b>Hello, developer!</b>";
  var f = Ti.Filesystem.getFile("cricket.wav");
  emailDialog.addAttachment(f);
  emailDialog.open();
}

var labelTab2 = Ti.UI.createLabel({
  text: `${Ti.App.Properties.getString("Major")}.${Ti.App.Properties.getString(
    "Minor"
  )}.${buildNumber}`,
});
$.win2.add(labelTab2);

//here is where we make the request
xhr.send({
  url: "https://63da6fbb2af48a60a7cdc739.mockapi.io/api/v1/sample_data",
  method: "GET",
  success: onSuccess,
  error: onError,
});

$.dataList.addEventListener("swipe", function (e) {
  if (e.x < e.y) {
    items.splice(e.itemIndex, 1);
    $.dataList.sections[0].setItems(items);
  }
});
