Angular Webpack Seed
--------------------

An **unfinished** and **unsupported** angular webpack seed.

I probably won't be maintaining this - but feel free to use and contribute.

### Features

* Use *.jade and *.less
* Includes Twitter Bootstrap 3
* Includes UI Router
* Hot Module Reload - instant reload of:
    * LESS & CSS
    * Templates (`**/*.state.jade`)
    * Controllers (`**/*Ctrl.js`)

### Install

```
   # install webpack and bower globally
   npm install webpack -g
   npm install webpack-dev-server -g
   npm install bower -g

   git clone git@github.com:markmarijnissen/angular-webpack-seed.git
   # rm -rf .git    # remove git repository (optional)
   npm install
   bower install
```

### Develop
```
   webpack-dev-server --hot --ip=192.168.1.10
```

The `--ip` defaults to `localhost` and is only required if you want to access the website from another device or computer (on the same network).

### Build
```
   webpack
   webpack --minify
```

### Magic

Check out `angular-hot-module-replacement.js`. It works as follows:

1. Create a `require.context` to require all templates (`*.static.jade`) and controllers (`*Ctrl`)
2. Accept a changed (invalidated) context by reloading state.

`angular-hot-module-replacement` now accepts all changes in templates and controllers, but only if they bubble up to the `require.context`! 

However:

* You cannot require templates and controllers directly, because if they are invalidated, they are not accepted. (Unless you write custom `module.hot.accept` handlers)
* `ui-router` resolves `templateUrl`s and `controller`s only the first time. 

To solve this, I have created factory functions that `require` a fresh template and controller each time state changes.

```js
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
```

As you can see in `app.js`, the factory functions are available on the `$hmr` service (from the `hot-module-replacement` angular module).

Now you can populate your `ui-router` config with hot-reloaded templates and controllers:

```js
   .state('a',{
      url: "/a",
      template: $hmr.template('a/a'),
      controllerProvider: $hmr.controller('a/ACtrl')
   })
```

Awesome!

### Todo

* Add/Fix `AngularPlugin` - automatically require AngularJS modules
* Add test scripts
* Use NPM package.json scripts to run test/clean tasks 
* Hot Update Directives.

### Known Issues

There is a bug in `webpack` to accept multiple numeric dependencies (`angular-hot-module-replacement.js`). Will be fixed soon.