angular-bootstrap-colorpicker
=============================

Angularjs directive for <a href="http://www.eyecon.ro/bootstrap-colorpicker/" target="_blank">bootstrap-colorpicker</a> library.<br />
Go to <a href="http://web.hostdmk.net/github/colorpicker/" target="_blank">demo page</a>

Installation
===============================
Copy css/colorpicker.css, img/*.png and, lib/bootstrap-colorpicker.js, js/bootstrap-colorpicker-module.js.
Add a dependency to your app, for instance:
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'colorpicker.module'])

Examples (ng-model is optional):
===============================

Hex format
```html
<input colorpicker class="span2" value="" type="text" ng-model="your_model" >
```
or
```html
<input colorpicker="hex" class="span2" value="" type="text" ng-model="your_model" >
```

RGB format
```html
<input colorpicker="rgb" class="span2" value="" type="text" ng-model="your_model" />
```

RBGA format
```html
<input colorpicker="rgba" class="span2" value="" type="text" ng-model="your_model" />
```

As component
```html
<colorpicker input-name="foo" input-class="span2" color-format="hex" ng-model="componentPicker" />
```

As non input element
```html
<div colorpicker class="span2" data-color="initial_colorcode" ng-model="your_model"></div>
```
