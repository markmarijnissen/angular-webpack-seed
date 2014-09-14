angular.module('app',[
  'ui.router'
])
.constant('templates',require.context('./',true,/^\.\/.*\.state\.jade$/))
.config(function($stateProvider,$urlRouterProvider,templates){
  $urlRouterProvider.otherwise('/a');
  $stateProvider
    .state('a',{
      url: "/a",
      template: createTemplateFn('a')
    })
    .state('b',{
      url: "/b",
      template: createTemplateFn('b')
    });

  // createTemplate; 
  // helper to wrap a function around a template require call
  function createTemplateFn(name,data) {
    return function(){
      return templates('./'+name+'.state.jade')(data);
    };
  }
})
.run(function($state,templates){
  if(module.hot){
    module.hot.accept(templates.id,function(){
      $state.transitionTo($state.current, $state.params, {
          reload: true,
          inherit: false,
          notify: true
      });
    });
  }
});