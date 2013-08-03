'use strict';

describe('colorpicker module', function () {

  beforeEach(module('colorpicker.module'));

  describe('helpers', function () {
    var helper;
    var element, scope;

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

      var mockPluginApi = {
        color: {
          setColor: jasmine.createSpy()
        }
      };

      element = angular.element('<input type="text" value="" />');
      element.data('colorpicker', mockPluginApi);

      helper.updateView(element);
      expect(element.val()).toEqual('');
      expect(element.data('colorpicker').color.setColor).toHaveBeenCalled();

      helper.updateView(element, '#ff0000');
      expect(element.val()).toEqual('#ff0000');
      expect(element.data('colorpicker').color.setColor.callCount).toEqual(2);
    });
  });
});