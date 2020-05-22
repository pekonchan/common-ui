// const path = require('path');

// module.exports = {
//     pages: {
//         app: {
//             entry: path.resolve('examples/main.js'),
//             // 在 dist/index.html 的输出
//             filename: 'index.html'
//         }
//     },
//     chainWebpack: config => {
//         config
//             // .entry('app')
//             //     .clear()
//             //     .add(path.resolve('examples/main.js'))
//             //     .end()
//             .resolve.alias
//                 .set('@', path.resolve('examples'))
//     }
// };