(function (global) {
  // Twitter に投稿
  bindReady(function() {
    $("#tweet").bind('submit', function(event) {
      event.preventDefault();
      var body = $("#tweet textarea").value(),
          _csrf = $("#tweet input[name=_csrf]").value(),
          xhr = util.createXhr().initialize({
            method: "POST",
            url: "./",
            params: {body: body, _csrf: _csrf},
            callback: didPost
          });
      xhr.send();
      return false;
    }, false);

    // 文字数カウント
    $("#tweet textarea").bind("keyup", function(event) {
      var max = 140,
          count = $(event.target).value().length,
          res = count + " / " + max;
      $("#counter").html(res);
    }, false);
    function didPost(res) {
      if (!!res.status === false) alert(res.msg);
      $("#tweet textarea").value("");
      $("#counter").html("0 / 140");
    }
  });
})(window);
