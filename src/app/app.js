angular.module('app',[
  'ui.router'
])
.constant('require',(function(){
  var TemplateRequire, ControllerRequire;
  function load(){
    TemplateRequire = require.context('./',true,/^\.\/.*\.state\.jade$/);
    ControllerRequire = require.context('./',true,/^\.\/.*Ctrl$/);
  }
  load();
  return {
    ids: [TemplateRequire.id,ControllerRequire.id],
    reload: load,
    template: function(name,data){
      return function(){
        return TemplateRequire('./'+name+'.state.jade')(data);
      };
    },
    controller: function(name){
      return function(){
        return ControllerRequire('./'+name);
      };
    }
  };
})())
.config(function($stateProvider,$urlRouterProvider,require){
  $urlRouterProvider.otherwise('/a');
  $stateProvider
    .state('a',{
      url: "/a",
      template: require.template('a/a'),
      controllerProvider: require.controller('a/ACtrl')
    })
    .state('b',{
      url: "/b",
      template: require.template('b/b'),
      controllerProvider: require.controller('b/BCtrl')
    });
})
.run(function($state,require){
  if(module.hot){
    module.hot.accept(require.ids,function() {
      require.reload();
      $state.transitionTo($state.current, $state.params, {
          reload: true,
          inherit: false,
          notify: true
      });
    });
  }
});

