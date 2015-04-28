module.exports = function(config){
  config.set({
    basePath : '../',
    files : [
      'test/libs/jquery-1.10.1.min.js',
      'test/libs/angular.min.js',
      'test/libs/angular-mocks.js',
      'js/**/bootstrap-colorpicker-module.js',
      'test/unit/**/*.js'
    ],
    singleRun: true,
    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },
    preprocessors: {
      'js/bootstrap-colorpicker-module.js': 'coverage'
    }
  });
};