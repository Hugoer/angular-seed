var globby = require('globby');

var rimraf = require('rimraf');

globby([
    './node_modules/moment/locale/*',
    '!./node_modules/moment/locale/es.js',
    '!./node_modules/moment/locale/en-gb.js'
])
    .then(function then(paths) {
        paths.map(function map(item) {
            rimraf.sync(item);
        });
    });
