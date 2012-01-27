(function (global) {
  $("#tweet").bind('submit', function(event) {
    event.preventDefault();
    var body = $("#tweet input[type=textarea]").value(),
        _csrf = $("#tweet input[name=_csrf]").value(),
        xhr = util.createXhr().initialize({
          method: "POST",
          url: "/",
          params: {body: body, _csrf: _csrf},
          callback: didPost
        });
    xhr.send();
    return false;
  }, false);

  function didPost(res) {
    if (!!res.status === false) alert(res.msg);
    var body = $("#tweet input[type=textarea]").value("");
  }
})(window);
