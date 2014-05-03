module.exports = {
  all: {
    options: {
      browsers: ['PhantomJS'],
      files: [
        'src/griptape.js',
        'test/griptape.js'
      ],
      frameworks: ['mocha', 'chai'],
      singleRun: true
    }
  }
};
