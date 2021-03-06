/* jshint node: true */
module.exports = function (grunt) {
    'use strict';

    var path = require('path');

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';


    grunt.initConfig({

        less: {
            compile: {
                files: {
                    '_assets/assets/theme/css/style.css': '_assets/assets/theme/less/style.less'
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '_assets/assets/theme/css/*.css'
            }
        },
        watch: {
            less: {
                files: ['_assets/assets/theme/less/**/*.less'],
                tasks: ['theme_css']
            }
        }

    });



    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    grunt.registerTask('theme_css', ['less', 'postcss']);
    grunt.registerTask('update_readmes', 'Copies the home page md to ./README.md and _assets/README.md', function(){
        var src = './_content/index/index.md';
        var dst = './README.md';
        var yamlFront = require('yaml-front-matter');
        var data = yamlFront.loadFront(grunt.file.read(src));
        grunt.file.write(dst, data.__content);
        dst = './_assets/README.md';
        grunt.file.write(dst, data.__content);
    });


};

