const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js')
    },
    // webpack-dev-serverの設定
    devServer: {
        open: true,
        port: 9000,
        // コンテンツのルートディレクトリ publicを指定しているので./public/index.htmlが開かれる
        contentBase: './public'
    }
}