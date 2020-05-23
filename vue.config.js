const path = require('path');

module.exports = {
    // pages: {
    //     app: {
    //         entry: path.resolve('examples/main.js'),
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html'
    //     }
    // },
    chainWebpack: config => {
        config
            // .entry('app')
            //     .clear()
            //     .add(path.resolve('examples/main.js'))
            //     .end()
            // .resolve.alias
            //     .set('@', path.resolve('examples'))
            .resolve.alias
                .set('~', path.resolve('packages'))
                .end()
                .end()
            .module.rule('md')
                .test(/\.md/)
                .use('vue-loader')
                .loader('vue-loader')
                .end()
                .use('vue-markdown-loader')
                .loader('vue-markdown-loader/lib/markdown-compiler')
                .options({
                    raw: true
                })
            
    }
};