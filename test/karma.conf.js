module.exports = function(config){
  config.set({
    basePath : '',
    files : [
      'libs/jquery-1.10.1.min.js',
      'libs/angular.min.js',
      'libs/angular-mocks.js',
      '../js/**/*.js',
      'unit/**/*.js'
    ],
    autoWatch : true,
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
      dir: 'coverage/',
    },
    preprocessors: {
      '../**/js/**/*.js': 'coverage'
    }
  });
};