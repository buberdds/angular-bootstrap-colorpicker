angular-bootstrap-colorpicker
=============================

This version contains a native AngularJS directive based on bootstrap-colorpicker jQuery library.<br />
No dependency on jQuery or jQuery plugin is required.<br />
If you need a functionality from the original plugin or IE&lt;9 support switch to <a href="https://github.com/buberdds/angular-bootstrap-colorpicker/tree/1.0.0">1.0.0 branch</a> in this repository.

<a href="http://web.hostdmk.net/github/colorpicker_v2/" target="_blank">Demo page</a>

Installation
===============================
Copy css/colorpicker.css and js/bootstrap-colorpicker-module.js.
Add a dependency to your app, for instance:
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'colorpicker.module'])

Examples:
===============================

Hex format
```html
<input colorpicker class="span2" type="text" ng-model="your_model" />
```
or
```html
<input colorpicker="hex" class="span2" type="text" ng-model="your_model" />
```

RGB format
```html
<input colorpicker="rgb" class="span2" type="text" ng-model="your_model" />
```

RBGA format
```html
<input colorpicker="rgba" class="span2" type="text" ng-model="your_model" />
```

As non input element
```html
<div colorpicker class="span2" ng-model="your_model"></div>
```