var tweet = document.querySelector("#tweet");
tweet.addEventListener('submit', function(event) {
  event.preventDefault();
  var body = document.querySelector("#tweet input[type=textarea]").value;
  var xhr = createXhr().initialize({
    method: "POST",
    url: "/",
    params: {body: body},
    callback: didPost
  });
  xhr.send();
  return false;
}, false);

function didPost(res) {
  if (!!res.status === false) alert(res.msg);
}

function parseParams(params) {
  var parsed = "",
  prefix,
  key;
  for (key in params) {
    if (params.hasOwnProperty(key)) {
      prefix = (parsed === "") ? "" : "&";
      parsed += prefix + key + "=" + encodeURIComponent(params[key]);
    }
  }
  return parsed;
}

function createXhr() {
  interfaces = {
    initialize: initialize,
    send: send
  };

  function initialize(requestData) {
    this._req = new XMLHttpRequest();

    this._method = requestData.method;
    this._url = requestData.url;
    this._params = requestData.params;
    this._callback = requestData.callback;

    this._req.open(this._method, this._url, true);

    return this;
  }
  function send(callback){
    this._req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    this._req.onreadystatechange = (function() {
      var self = this;
      return function() {
        if(self._req.readyState == 4) {
          if(self._req.status == 200 || self._req.status == 0) {
            self._callback(JSON.parse(self._req.responseText));
          }
        }
      }
    }).call(this)
    this._req.send(parseParams(this._params));
  }

  return interfaces;
}
