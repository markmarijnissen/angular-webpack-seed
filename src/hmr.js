// Create a Require Context for all Controllers and Templates:
var TemplateRequire, ControllerRequire;
function load(){
  TemplateRequire = require.context('./app/',true,/^\.\/.*\.state\.jade$/);
  ControllerRequire = require.context('./app/',true,/^\.\/.*Ctrl$/);
}
load();

module.exports = {
  // RequireContext module ids - see 'module.hot.accept' in "app.js"
  ids: [TemplateRequire.id,ControllerRequire.id],

  // Reload function when a hot module replacement comes in.
  reload: load,
  
  // Function to create Template Factory, using require-context to grab latest template.
  template: function(name,data){
    return function(){
      return TemplateRequire('./'+name+'.state.jade')(data);
    };
  },
  
  // Function to create Controller Factory, using require-context to grab latest controller
  controller: function(name){
    return function(){
      return ControllerRequire('./'+name);
    };
  }
};