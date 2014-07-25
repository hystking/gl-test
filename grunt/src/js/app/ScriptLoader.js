var async = require("async");
var ScriptLoader = function(srcList){
  this.srcList = srcList;
};

ScriptLoader.prototype = {
  "loadAll": function(callback){
    var i, l,
      srcList = this.srcList,
      asyncList = [];
    for(i=0, l=srcList.length; i<l; i++){
      asyncList.push(
        this._load.bind(this, srcList[i])
      );
    }
    async.parallel(asyncList, callback);
  },
  "_load": function(params, callback){
    var script = document.createElement("script"),
        xhr = new XMLHttpRequest();
    //script.src = params.src;
    script.id = params.id || "";
    script.type = params.type || "";
    xhr.open("GET", params.src, true);
    xhr.send(null);
    xhr.onload = function(){
      var loaded = xhr.readyState === 4;
      var success = loaded && xhr.status === 200;
      var fail = loaded && xhr.status !== 200;
      if(success){
        script.textContent = xhr.responseText;
      }
      if(fail){
        script.textContent = "";
      }
      if(loaded){
        callback();
      }
    };
    document.body.appendChild(script);
  }
};
module.exports = ScriptLoader;
