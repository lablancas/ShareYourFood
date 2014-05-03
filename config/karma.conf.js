/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            '**/*.js'
        ],
        exclude: [
        ],
        autoWatch: true,
        frameworks: [
            'jasmine'
        ],
        browsers: [
            "Chrome"
        ],
        plugins: [
            'karma-script-launcher',
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-jasmine'
        ],
        
        junitReporter: {
          outputFile: 'test-results.xml',
          suite: 'unit'
        }
    });
};
