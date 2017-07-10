// 目錄底下加上這個檔案, 會自動 require 這個目錄底下的檔案
var normalizedPath = require("path").join(__dirname, ".");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  // if (file != 'api.js') {
    require("./" + file);
  // }
});