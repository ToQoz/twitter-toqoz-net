(function (global) {
  function $(query, index) {
    var _querySelector = "querySelector"
    var _querySelectorAll = "querySelectorAll"

    var interfaces = {
      _initialize: _initialize,
      bind: bind,
      dom: false,
      value: value
    };

    interfaces._initialize(query, index);
    return interfaces;

    function _initialize(query, index) {
      this.dom = (index) ? document[_querySelectorAll](query)[index] :
                           document[_querySelector](query);
      return this;
    }

    function expand(obj) {
      var key;
      for (key in obj) {
        if (obj.hasOwnProperty("key") && !this.hasOwnProperty("key")) {
          this[key] = obj[key];
        }
      }
    }

    function value(newValue) {
      if (typeof newValue === "undefined") {
        return this.dom.value;
      } else {
        return this.dom.value = newValue;
      }
    }

    function bind(type, listener, useCapture) {
      return this.dom.addEventListener(type, listener, useCapture)
    }
  }
  global.$ = $;
})(window);
