const util = require('gulp-util');

const production = util.env.production || util.env.prod || false;
const srcPath = './';
const destPath = './dist/';

const config = {
    env       : 'development',
    production: production,
    src: {
        sass : srcPath + 'scss'
    },
    dest: {
        css  : destPath + 'css/'
    },
    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },
    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },
    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
