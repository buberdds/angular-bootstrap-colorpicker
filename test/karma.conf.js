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
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  })
};