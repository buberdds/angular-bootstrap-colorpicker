angular-bootstrap-colorpicker v2
=============================

This version contains a native AngularJS directive based on bootstrap-colorpicker jQuery library.<br />
No dependency on jQuery or jQuery plugin is required.<br />
If you need a functionality from the original plugin switch to other branch in this repository.

<a href="http://web.hostdmk.net/github/colorpicker_v2/" target="_blank">Demo page</a>

Installation
===============================
Copy css/colorpicker.css and js/bootstrap-colorpicker-module.js.
Add a dependency to your app, for instance:
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'colorpicker.module'])

Examples (model must be an object):
===============================

Hex format
```html
<input colorpicker class="span2" value="" type="text" ng-model="your_model" />
```
or
```html
<input colorpicker="hex" class="span2" value="" type="text" ng-model="your_model" />
```

RGB format
```html
<input colorpicker="rgb" class="span2" value="" type="text" ng-model="your_model" />
```

RBGA format
```html
<input colorpicker="rgba" class="span2" value="" type="text" ng-model="your_model" />
```