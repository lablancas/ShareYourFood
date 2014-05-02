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
            'Chrome'
        ],
        plugins: [
        ]
    });
};
