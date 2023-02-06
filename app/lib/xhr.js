//xhr.js

//alloy built-in libs like underscore and moment.js are prefaced with 'alloy/' in the path
var _ = require("alloy/underscore");

function send(args) {
  var request = Titanium.Network.createHTTPClient();

  request.onload = function () {
    //Use an underscore helper function to check that we
    //have a function in args.success before calling it
    if (_.isFunction(args.success)) {
      //Here we call the callback
      args.success(this.responseText);
    }
  };

  request.onerror = function (e) {
    if (_.isFunction(args.error)) {
      args.error(e);
    }
  };

  request.open(args.method, args.url);
  request.send();
}

exports.send = send;
