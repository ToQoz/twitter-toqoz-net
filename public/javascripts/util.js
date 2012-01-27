(function (global) {
  var util = {
    createXhr: createXhr,
    parseParams: parseParams
  };
  /**
   * memberof util 
   */
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

  /**
   * memberof util
   */
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
      this._req.setRequestHeader('X-CSRF-Token', this._params._csrf);
      this._req.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
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
      this._req.send(util.parseParams(this._params));
    }
    return interfaces;
  }

  global.util =  util;
})(window);
