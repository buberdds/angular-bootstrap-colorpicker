files = [
  JASMINE,
  JASMINE_ADAPTER,
  'libs/angular.min.js',
  'libs/angular-mocks.js',
  '../js/**/*.js',
  'unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
