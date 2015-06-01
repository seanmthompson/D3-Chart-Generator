module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),       
		
		uglify: {
			options: {
				mangle: false,
                sourceMap: true
			},
			build: {
				files: {
					'dist/js/main.min.js': [
						'src/js/libs/jquery/dist/jquery.js',
						'src/js/libs/angular/angular.js',
						'src/js/libs/saveSvgAsPng/saveSvgAsPng.js',
						'src/js/libs/ui-sortable/src/sortable.js',
						'src/js/libs/angular-bootstrap/ui-bootstrap-tpls.js',
						'src/js/libs/ui-router/release/angular-ui-router.js',
						'src/js/libs/angular-animate/angular-animate.js',
						'src/js/libs/d3/d3.js'
					]
				}
			}
		},
		
		less: {
		  development: {
			options: {
			  paths: ["src/less"],
				compress: true
			},
			files: {
				"dist/css/app.css": "src/less/app.less",
				"charts.css": "charts.less",
			}
		  }
		},

		watch: {    			
			less: {
				files: ['*.less', 'src/less/*.less', 'src/less/**/*.less'],
				tasks: ['less']
			},
			
			js: {
				files: ['src/js/*.js', 'src/js/**/*.js'],
				tasks: ['uglify']
			}
		}
    });

    grunt.registerTask('default', []);

};