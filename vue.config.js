const path = require('path');
const utils = require('./docsUtils.js');

module.exports = {
    // pages: {
    //     app: {
    //         entry: path.resolve('examples/main.js'),
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html'
    //     }
    // },
    publicPath: '/common-ui/',
    outputDir: 'docs',
    chainWebpack: config => {
        config
            .entry('app')
                .clear()
                .add(path.resolve('examples/main.js'))
                .end()
            .resolve.alias
                .set('@', path.resolve('examples'))
                .set('~', path.resolve('packages'))
                .end()
                .end()
            .module.rule('md')
                .test(/\.md/)
                .use('vue-loader')
                .loader('vue-loader')
                .end()
                .use('md-loader')
                .loader(path.resolve('md-loader.js'))
                .options({
                    raw: true,
                    preprocess: utils.mdPreprocess
                })
            
    }
};