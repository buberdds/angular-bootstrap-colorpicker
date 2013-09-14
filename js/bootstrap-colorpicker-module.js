'use strict';

angular.module('colorpicker.module', [])
  .factory('helper', function () {
    return {
      getOffset: function (el) {
        var
          _x = 0,
          _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft + el.scrollLeft;
          _y += el.offsetTop + el.scrollTop;
          el = el.offsetParent;
        }
        return {
          top: _y,
          left: _x
        };
      },
      extend: function () {
        for (var i = 1; i < arguments.length; i++) {
          for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
              arguments[0][key] = arguments[i][key];
            }
          }
        }
        return arguments[0];
      },
      // a set of RE's that can match strings and generate color tuples. https://github.com/jquery/jquery-color/
      stringParsers: [
        {
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
          parse: function (execResult) {
            return [
              execResult[1],
              execResult[2],
              execResult[3],
              execResult[4]
            ];
          }
        },
        {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
          parse: function (execResult) {
            return [
              2.55 * execResult[1],
              2.55 * execResult[2],
              2.55 * execResult[3],
              execResult[4]
            ];
          }
        },
        {
          re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
          parse: function (execResult) {
            return [
              parseInt(execResult[1], 16),
              parseInt(execResult[2], 16),
              parseInt(execResult[3], 16)
            ];
          }
        },
        {
          re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
          parse: function (execResult) {
            return [
              parseInt(execResult[1] + execResult[1], 16),
              parseInt(execResult[2] + execResult[2], 16),
              parseInt(execResult[3] + execResult[3], 16)
            ];
          }
        },
        {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
          space: 'hsla',
          parse: function (execResult) {
            return [
              execResult[1] / 360,
              execResult[2] / 100,
              execResult[3] / 100,
              execResult[4]
            ];
          }
        }
      ]
    }
  })
  .factory('Color', ['helper', function (helper) {
    return {
      value: {
        h: 1,
        s: 1,
        b: 1,
        a: 1
      },
      // translate a format from Color object to a string
      'rgb': function () {
        var rgb = this.toRGB();
        return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
      },
      'rgba': function () {
        var rgb = this.toRGB();
        return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
      },
      'hsl': function () {
        var hsl = this.toHSL();
        return 'hsl(' + Math.round(hsl.h * 360) + ',' + Math.round(hsl.s * 100) + '%,' + Math.round(hsl.l * 100) + '%)';
      },
      'hsla': function () {
        var hsl = this.toHSL();
        return 'hsla(' + Math.round(hsl.h * 360) + ',' + Math.round(hsl.s * 100) + '%,' + Math.round(hsl.l * 100) + '%,' + hsl.a + ')';
      },
      'hex': function () {
        return  this.toHex();
      },

      // HSBtoRGB from RaphaelJS
      RGBtoHSB: function (r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;

        var H, S, V, C;
        V = Math.max(r, g, b);
        C = V - Math.min(r, g, b);
        H = (C === 0 ? null :
          V == r ? (g - b) / C :
            V == g ? (b - r) / C + 2 :
              (r - g) / C + 4
          );
        H = ((H + 360) % 6) * 60 / 360;
        S = C === 0 ? 0 : C / V;
        return {h: H || 1, s: S, b: V, a: a || 1};
      },

      HueToRGB: function (p, q, h) {
        if (h < 0)
          h += 1;
        else if (h > 1)
          h -= 1;

        if ((h * 6) < 1)
          return p + (q - p) * h * 6;
        else if ((h * 2) < 1)
          return q;
        else if ((h * 3) < 2)
          return p + (q - p) * ((2 / 3) - h) * 6;
        else
          return p;
      },

      HSLtoRGB: function (h, s, l, a) {
        if (s < 0) {
          s = 0;
        }
        var q;
        if (l <= 0.5) {
          q = l * (1 + s);
        } else {
          q = l + s - (l * s);
        }

        var p = 2 * l - q;

        var tr = h + (1 / 3);
        var tg = h;
        var tb = h - (1 / 3);

        var r = Math.round(this.HueToRGB(p, q, tr) * 255);
        var g = Math.round(this.HueToRGB(p, q, tg) * 255);
        var b = Math.round(this.HueToRGB(p, q, tb) * 255);
        return [r, g, b, a || 1];
      },

      //parse a string to HSB
      setColor: function (val) {
        val = val.toLowerCase();
        for (var key in helper.stringParsers) {
          var parser = helper.stringParsers[key];
          var match = parser.re.exec(val),
            values = match && parser.parse(match),
            space = parser.space || 'rgba';
          if (values) {
            if (space === 'hsla') {
              this.value = this.RGBtoHSB.apply(null, this.HSLtoRGB.apply(null, values));
            } else {
              this.value = this.RGBtoHSB.apply(null, values);
            }
            return false;
          }
        }
      },

      setHue: function (h) {
        this.value.h = 1 - h;
      },

      setSaturation: function (s) {
        this.value.s = s;
      },

      setLightness: function (b) {
        this.value.b = 1 - b;
      },

      setAlpha: function (a) {
        this.value.a = parseInt((1 - a) * 100, 10) / 100;
      },

      // HSBtoRGB from RaphaelJS
      // https://github.com/DmitryBaranovskiy/raphael/
      toRGB: function (h, s, b, a) {
        if (!h) {
          h = this.value.h;
          s = this.value.s;
          b = this.value.b;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = b * s;
        X = C * (1 - Math.abs(h % 2 - 1));
        R = G = B = b - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return {
          r: Math.round(R * 255),
          g: Math.round(G * 255),
          b: Math.round(B * 255),
          a: a || this.value.a
        };
      },

      toHex: function (h, s, b, a) {
        var rgb = this.toRGB(h, s, b, a);
        return '#' + ((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
      },

      toHSL: function (h, s, b, a) {
        if (!h) {
          h = value.h;
          s = value.s;
          b = value.b;
        }
        var H = h,
          L = (2 - s) * b,
          S = s * b;
        if (L > 0 && L <= 1) {
          S /= L;
        } else {
          S /= 2 - L;
        }
        L /= 2;
        if (S > 1) {
          S = 1;
        }
        return {
          h: H,
          s: S,
          l: L,
          a: a || value.a
        };
      }
    }
  }])
  .directive('colorpicker', ['$document', '$compile', 'Color', 'helper', function ($document, $compile, Color, helper) {
    return {
      require: 'ngModel',
      scope: true,
      restrict: 'A',
      link: function ($scope, elem, attrs, ngModel) {

        var
          template = '<div class="colorpicker dropdown-menu">' +
            '<div class="colorpicker-saturation"><i><b></b></i></div>' +
            '<div class="colorpicker-hue"><i></i></div>' +
            '<div class="colorpicker-alpha"><i></i></div>' +
            '<div class="colorpicker-color"><div /></div>' +
            '</div>',
          colorpickerTemplate = angular.element(template),
          pickerColor = Color,
          pickerColorPreview,
          pickerColorAlpha,
          pickerColorBase,
          pointer = null,
          slider = null;

        var thisFormat = attrs.colorpicker ? attrs.colorpicker : 'hex';

        $compile(colorpickerTemplate)($scope);

        pickerColorAlpha = {
          enabled: thisFormat === 'rgba' || thisFormat === 'hsla',
          css: null
        };

        if (pickerColorAlpha.enabled === true) {
          colorpickerTemplate.addClass('alpha');
          pickerColorAlpha.css = colorpickerTemplate.find('div')[2].style;
        }

        angular.element(document.body).append(colorpickerTemplate);

        ngModel.$render = function () {
          elem.val(ngModel.$viewValue);
        };

        elem.bind('$destroy', function() {
          colorpickerTemplate.remove();
        });

        $scope.$on('changeColor', function (event, newColor) {
          $scope.$apply(ngModel.$setViewValue(newColor));
          elem.val(newColor);
        });

        pickerColorBase = colorpickerTemplate.find('div')[0].style;
        pickerColorPreview = colorpickerTemplate.find('div')[4].style;

        var slidersUpdate = function (event) {
          event.stopPropagation();
          event.preventDefault();
          var zone = event.target;
          if (zone.className === 'colorpicker-saturation') {
            slider = helper.extend({}, {
              maxLeft: 100,
              maxTop: 100,
              callLeft: 'setSaturation',
              callTop: 'setLightness'
            });
          }
          else if (zone.className === 'colorpicker-hue') {
            slider = helper.extend({}, {
              maxLeft: 0,
              maxTop: 100,
              callLeft: false,
              callTop: 'setHue'
            });
          }
          else if (zone.className === 'colorpicker-alpha') {
            slider = helper.extend({}, {
              maxLeft: 0,
              maxTop: 100,
              callLeft: false,
              callTop: 'setAlpha'
            });
          } else {
            return false;
          }
          slider.knob = zone.children[0].style;
          slider.left = event.pageX - helper.getOffset(zone).left;
          slider.top = event.pageY - helper.getOffset(zone).top;
          pointer = {
            left: event.pageX,
            top: event.pageY
          };
        };

        var mousemove = function (event) {
          var left = Math.max(
            0,
            Math.min(
              slider.maxLeft,
              slider.left + ((event.pageX || pointer.left) - pointer.left)
            )
          );

          var top = Math.max(
            0,
            Math.min(
              slider.maxTop,
              slider.top + ((event.pageY || pointer.top) - pointer.top)
            )
          );

          slider.knob.left = left + 'px';
          slider.knob.top = top + 'px';
          if (slider.callLeft) {
            pickerColor[slider.callLeft].call(pickerColor, left / 100);
          }
          if (slider.callTop) {
            pickerColor[slider.callTop].call(pickerColor, top / 100);
          }
          $scope.previewColor();
          $scope.$emit('changeColor', pickerColor[thisFormat]());
          return false;
        };

        var mouseup = function () {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        };

        $scope.previewColor = function () {
          try {
            pickerColorPreview.backgroundColor = pickerColor[thisFormat]();
          } catch (e) {
            pickerColorPreview.backgroundColor = pickerColor.toHex();
          }
          pickerColorBase.backgroundColor = pickerColor.toHex(pickerColor.value.h, 1, 1, 1);
          if (pickerColorAlpha.enabled === true) {
            pickerColorAlpha.css.backgroundColor = pickerColor.toHex();
          }
        };

        $scope.update = function () {
          pickerColor.setColor(elem.val());
          colorpickerTemplate.find('i')
            .eq(0).css({
              left: pickerColor.value.s * 100,
              top: 100 - pickerColor.value.b * 100
            })
            .eq(1).css('top', 100 * (1 - pickerColor.value.h))
            .eq(2).css('top', 100 * (1 - pickerColor.value.a));
          $scope.previewColor();
        };

        $scope.place = function () {
          colorpickerTemplate.css({
            'top': helper.getOffset(elem[0]).top + elem[0].offsetHeight - document.body.scrollTop + 'px',
            'left': helper.getOffset(elem[0]).left - document.body.scrollLeft + 'px'
          });
        };

        $scope.show = function () {
          $scope.update();
          colorpickerTemplate.addClass('colorpicker-visible');
          $scope.place();
        };

        elem.bind('click', function () {
          $scope.show();
        });

        colorpickerTemplate.bind('mousedown', function (event) {
          event.stopPropagation();
          event.preventDefault();
        });

        colorpickerTemplate.find('div').bind('click', function (event) {
          slidersUpdate(event);
          mousemove(event);
        });

        colorpickerTemplate.find('div').bind('mousedown', function (event) {
          slidersUpdate(event);
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
        });

        $document.bind('mousedown', function () {
          if (colorpickerTemplate.hasClass('colorpicker-visible')) {
            colorpickerTemplate.removeClass('colorpicker-visible');
          }
        });
      }
    };
  }]);
