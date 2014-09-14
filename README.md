Angular Webpack Seed
--------------------

An **unfinished** and **unsupported** angular webpack seed.

I probably won't be maintaining this - but feel free to use and contribute.

### Features

* Use *.jade and *.less
* Includes Twitter Bootstrap 3
* Includes UI Router
* Hot Module Reload: Reload LESS and templates without page refresh!

### Install
```
   git clone git@github.com:markmarijnissen/angular-webpack-seed.git
   # rm -rf .git    # remove git repository (optional)
   npm install
   bower install
```

### Develop
```
   webpack-dev-server --hot
```

### Build
```
   webpack
   webpack --minify
```

### Notes

All `ui-router` state templates are **functions** which require a `*.state.jade` file. 

This is the behind-the-scenes magic:

* I've created a `require.context` which includes all `*.state.jade`.
* This `require.context` module is accepted when invalidated by a Hot update.
* When accepted, the `ui-router` reloads the current state.
* Because templates are **functions**, require is called again - and now it points to the hot updated module.

### Todo

* Add/Fix `AngularPlugin` - automatically require AngularJS modules
* Add test scripts
* Use gulp to run test/clean tasks.
* Use NPM package.json scripts to run test/clean tasks 
* Hot Update Controllers & Directives.

### Future: HMR for controllers & directives?

If I am not mistaken, you can redefine directives and controllers and Angular will use the latest definition. If this is true, then `app.js` can also accept hot module updates from controllers and directives and reloading the current state will suffice to recreate the template, controller and directives with the latest update.

* Perhaps create a require context for `*Ctrl.js` which is accepted in `app.js`. This causes webpack to include and accept all Controllers that follow the file convention. 
* What to do for directives?