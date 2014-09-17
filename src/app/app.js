angular.module('app',[
  'ui.router',
  'hot-module-replacement'
])
.config(function($stateProvider,$urlRouterProvider,$hmr){

  $urlRouterProvider.otherwise('/a');
  $stateProvider
    .state('a',{
      url: "/a",
      template: $hmr.template('a/a'),
      controllerProvider: $hmr.controller('a/ACtrl')
    })
    .state('b',{
      url: "/b",
      template: $hmr.template('b/b'),
      controllerProvider: $hmr.controller('b/BCtrl')
    });
});