angular.module('app',[
  'ui.router'
])
.constant('hmr',require('../hmr'))
.config(function($stateProvider,$urlRouterProvider,hmr){

  $urlRouterProvider.otherwise('/a');
  $stateProvider
    .state('a',{
      url: "/a",
      template: hmr.template('a/a'),
      controllerProvider: hmr.controller('a/ACtrl')
    })
    .state('b',{
      url: "/b",
      template: hmr.template('b/b'),
      controllerProvider: hmr.controller('b/BCtrl')
    });
})

// Accept a Hot Module Replacement by reloading state.
.run(function($state,hmr){
  if(module.hot){
    module.hot.accept(hmr.ids,function() {
      hmr.reload();
      $state.transitionTo($state.current, $state.params, {
          reload: true,
          inherit: false,
          notify: true
      });
    });
  }
});

