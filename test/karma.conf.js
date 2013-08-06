files = [
  JASMINE,
  JASMINE_ADAPTER,
  'libs/jquery-1.10.1.min.js',
  'libs/angular.min.js',
  'libs/angular-mocks.js',
  '../lib/bootstrap-colorpicker.js',
  '../js/**/*.js',
  'unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
