// const path = require('path')

// module.exports = {
//     entry: "./client/index.js",
//     output:{
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'public'),
//             },
//             module:{
//                 rules:[
//                     {
//                         test: /\.jsx?$/,
//                         exclude: /node_modules/,
//                         use: {
//                           loader: 'babel-loader',
//                           options: {
//                             presets: ['@babel/preset-env', '@babel/preset-react']
//                           }
//                         }
//                     }
//                 ]

//             },

//             resolve:{
//                 fallback:{
//                     "crypto": require.resolve("crypto-browserify"),
//                     "querystring": require.resolve("querystring-es3")
//                 }
//             }
// }