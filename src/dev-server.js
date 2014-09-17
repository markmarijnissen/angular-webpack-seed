var io = require("webpack-dev-server/client/web_modules/socket.io");
io = io.connect('http://'+DEV_SERVER_IP+':8080');

var initial = true;
var currentHash = "";

if(module.hot){
  console.log("[WDS] Hot Module Replacement enabled.");
}

io.on("invalid", function() {
  console.log("[WDS] App updated. Recompiling...");
});

io.on("hash", function(hash) {
  currentHash = hash;
});

io.on("ok", function() {
  if(initial) return initial = false;
  reloadApp();
});

io.on("warnings", function(warnings) {
  console.log("[WDS] Warnings while compiling.");
  for(var i = 0; i < warnings.length; i++)
    console.warn(warnings[i]);
  if(initial) return initial = false;
  reloadApp();
});

io.on("errors", function(errors) {
  console.log("[WDS] Errors while compiling.");
  for(var i = 0; i < errors.length; i++)
    console.error(errors[i]);
  if(initial) return initial = false;
  reloadApp();
});

io.on("proxy-error", function(errors) {
  console.log("[WDS] Proxy error.");
  for(var i = 0; i < errors.length; i++)
    console.error(errors[i]);
  if(initial) return initial = false;
  reloadApp();
});

io.on("disconnect", function() {
  console.error("[WDS] Disconnected!");
});

function reloadApp() {
  if(module.hot) {
    module.hot.check(true,function(err, updatedModules) {
      if(err) {
        console.warn("[WDS] Hot Update failed: " + err.message);
        console.warn("[WDS] Reloading...");
        window.location.reload();
        return;
      } if(updatedModules){
        console.log("[WDS] Hot Updated modules:",updatedModules);
      }
    });
  } else {
    console.log("[WDS] App updated. Reloading...");
    window.location.reload();
  }
}