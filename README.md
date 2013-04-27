angular-bootstrap-colorpicker
=============================

Angularjs directive for <a href="http://www.eyecon.ro/bootstrap-colorpicker/" target="_blank">Colorpicker for Bootstrap</a>.

Installation
===============================
Copy css/colorpicker.css, img/*.png and, lib/bootstrap-colorpicker.js, js/bootstrap-colorpicker-directive.js.
Add a dependency to your app, for instance:
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'colorpicker.directive']).

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
<input colorpicker="rgb" class="span2" value="" ng-model="your_model" type="text" />
```

RBGA format
```html
<input colorpicker="rgba" class="span2" value="" ng-model="your_model" type="text" />
```