var watchr = require("watchr");

module.exports = {
  watch: function (rules) {
    watchr.watch({
    path     : "./app/",
    listener : function (eventName, filePath) {
      for (var rule in rules)
        if (filePath.match(new RegExp("\\." + rule + "$")))
          rules[rule](filePath);
    }
  });
  }
}