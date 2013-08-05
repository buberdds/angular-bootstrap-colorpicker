'use strict';

describe('colorpicker module', function () {

  beforeEach(module('colorpicker.module'));

  describe('helpers', function () {
    var helper;

    beforeEach(inject(function (_helper_) {
      helper = _helper_;
    }));

    it('should return object with default hex values', function () {
      expect(helper.prepareValues()).toEqual({
        name: 'hex',
        transform: 'toHex'
      });
    });

    it('should return object with rgb values', function () {
      expect(helper.prepareValues('rgb')).toEqual({
        name: 'rgb',
        transform: 'toRGB'
      });
      expect(helper.prepareValues('rgba')).toEqual({
        name: 'rgba',
        transform: 'toRGB'
      });
    });

    it('should update attributes', function () {
      var
        element,
        mockPluginApi = {
          color: {
            setColor: jasmine.createSpy()
          }
        };

      element = angular.element('<input type="text" value="" />');
      element.data('colorpicker', mockPluginApi);

      helper.updateView(element);
      expect(element.val()).toEqual('');
      expect(element.data('colorpicker').color.setColor).toHaveBeenCalledWith('');

      helper.updateView(element, '#ff0000');
      expect(element.val()).toEqual('#ff0000');
      expect(element.data('colorpicker').color.setColor).toHaveBeenCalledWith('#ff0000');
    });

  });

  describe('directive', function () {
    var $compile, $rootScope;
    beforeEach(inject(
      ['$compile','$rootScope', function($c, $r) {
        $compile = $c;
        $rootScope = $r;
      }]
    ));

    it('should clean up element from dom', function () {
      var scope = $rootScope.$new();
      var element = $compile('<input type="text" value="" data-colorpicker />')(scope);

      expect($(document).find('.colorpicker').length).toBe(1);
      scope.$destroy();
      expect($(document).find('.colorpicker').length).toBe(0);
    });

  });
});