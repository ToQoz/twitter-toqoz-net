(function (global) {
  $("#tweet").bind('submit', function(event) {
    event.preventDefault();
    var body = $("#tweet input[type=textarea]").value(),
        xhr = util.createXhr().initialize({
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
    var body = $("#tweet input[type=textarea]").value("");
  }
})(window);
