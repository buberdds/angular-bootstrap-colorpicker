'use strict';

angular.module('colorpicker.directive', []).directive('colorpicker', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {

      if (!attrs.colorpicker) {
        attrs.colorpicker = 'hex';
      }

      var
        attrValue = attrs.colorpicker,
        thisFormat = {
          name: attrValue,
          transform: 'to' + (attrValue === 'hex' ? attrValue.charAt(0).toUpperCase() + attrValue.slice(1) : attrValue.length > 3 ? attrValue.toUpperCase().slice(0, -1) : attrValue.toUpperCase())
        };

      element.colorpicker({format: thisFormat.name});
      if(!ngModel) return;

      element.colorpicker().on('changeColor', function(event) {
        element.val(element.data('colorpicker').format(event.color[thisFormat.transform]()));
        scope.$apply(ngModel.$setViewValue(element.data('colorpicker').format(event.color[thisFormat.transform]())));
      });

      ngModel.$render = function() {
        element.val(ngModel.$viewValue || '');
        element.data('colorpicker').color.setColor(ngModel.$viewValue || '');
      };
    }
  };
});