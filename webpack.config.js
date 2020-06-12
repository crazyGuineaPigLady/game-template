const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: "out.js"
    },
    devServer: {
        overlay: true,
        contentBase: [
            path.join(__dirname, 'bundle'),
            path.join(__dirname, 'resource'),
        ],
        compress: true,
        port: 3000
    },
}