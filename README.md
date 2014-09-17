Angular Webpack Seed
--------------------

An **unfinished** and **unsupported** angular webpack seed.

I probably won't be maintaining this - but feel free to use and contribute.

### Features

* Use *.jade and *.less
* Includes Twitter Bootstrap 3
* Includes UI Router
* Hot Module Reload - instant reload with refresh of:
    * LESS & CSS
    * Templates (`*.state.jade`, when coupled to a state)
    * Controllers (for files that end in `-Ctrl.js`)

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
   webpack-dev-server --hot
```

### Build
```
   webpack
   webpack --minify
```

### Todo

* Add/Fix `AngularPlugin` - automatically require AngularJS modules
* Add test scripts
* Use NPM package.json scripts to run test/clean tasks 
* Hot Update Directives.