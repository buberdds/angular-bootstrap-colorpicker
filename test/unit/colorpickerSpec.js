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
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope;
      element = $compile('<input type="text" value="" data-colorpicker />')(scope);
      scope.$digest();
    }));

    it('should clean up element from dom', function () {
      expect($(document).find('.colorpicker').length).toBe(1);
      element.remove();
      expect($(document).find('.colorpicker').length).toBe(0);
    });

    it('should change visibility of the picker element', function() {
      element.click();
      expect($(document).find('.colorpicker').css('display')).toEqual('block');
    });

  });
});