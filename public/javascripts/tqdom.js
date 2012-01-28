(function (global) {
  function $(query) {
    var _querySelector = "querySelector"
    var _querySelectorAll = "querySelectorAll"

    var interfaces = {
      _initialize: _initialize,
      bind: bind,
      dom: false,
      value: value,
      html: html
    };

    interfaces._initialize(query);
    return interfaces;

    function _initialize(query) {
      if (!util.is("String", query)) {
        // HTMLElementとか渡ってきたとき
        this.dom = query;
      } else {
        var res = document[_querySelectorAll](query)
        this.dom = (res.length === 0) ? false :
                   (res.length === 1) ? res[0] :
                   res;
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
