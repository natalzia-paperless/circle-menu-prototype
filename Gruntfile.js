module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    haml: {
      dist: {                            // Target
        files: {                         // Dictionary of files
          'public/index.html': 'src/index.haml'
        }
      },
      partials: {
        files: grunt.file.expandMapping(['src/partials/*.haml'], 'public/partials/', {
          rename: function(base, path) {
            return base + path.replace(/src\/partials/gi, '').replace(/\.haml$/, '.html');
          }
        })
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'src/styles',
          cssDir: 'public/styles'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'public',
          keepalive: true,
          hostname: "*",
          open: {
            target: '127.0.0.1:9001', // target url to open
          },
          livereload: 9000
        }
      }
    },
    copy: {
      js: {
        expand: true,
        cwd: 'src/javascripts',
        src: '**',
        dest: 'public/javascripts',
        flatten: false,
        filter: 'isFile',
      },
      img: {
        expand: true,
        cwd: 'src/img',
        src: '**',
        dest: 'public/img',
        flatten: false,
        filter: 'isFile',
      }
    },
    clean: {
      public: ["public/"]
    },
    uglify: {
      js: {
        files: {
          'public/javascripts/app.min.js': ['public/javascripts/app.js']
        }
      },
    },
    watch: {
      options: {
        livereload: {
          port: 9000
        }
      },
      scripts: {
        files: ['src/javascripts/**/*.js'],
        tasks: ['copy:js'],
      },
      images: {
        files: ['src/img/**/*'],
        tasks: ['copy:img']
      },
      scss: {
        files: ['src/styles/**/*.scss'],
        tasks: ['compass'],
      },
      haml: {
        files: ["src/**/*.haml"],
        tasks: ['haml']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean:public', 'haml', 'compass', 'copy', 'watch']);

};