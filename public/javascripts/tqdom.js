(function (global) {
  function $(query, index) {
    var _querySelector = "querySelector"
    var _querySelectorAll = "querySelectorAll"

    var interfaces = {
      _initialize: _initialize,
      bind: bind,
      dom: false,
      value: value,
      html: html
    };

    interfaces._initialize(query, index);
    return interfaces;

    function _initialize(query, index) {
      if (!util.is("String", query)) {
        this.dom = query;
      } else {
        this.dom = (index) ? document[_querySelectorAll](query)[index] :
                             document[_querySelector](query);
      }
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
      if (util.is("undefined", newValue)) {
        return this.dom.value;
      } else {
        return this.dom.value = newValue;
      }
    }

    function html(newHtml) {
      if (util.is("undefined", newHtml)) {
        return this.dom.innerHTML;
      } else {
        return this.dom.innerHTML = newHtml;
      }
    }

    function bind(type, listener, useCapture) {
      return this.dom.addEventListener(type, listener, useCapture)
    }
  }
  global.$ = $;
})(window);
