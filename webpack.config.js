const  [path, htmlWebpackPlugin, MiniCssExtractPlugin] = [require('path'), require('html-webpack-plugin'), require('mini-css-extract-plugin')];

module.exports = {
    mode: 'development',  //production development
    entry: {
        index: path.resolve(__dirname, './src/public/javascripts/index')
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname, './src/dist/javascripts/')
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        ignored: /node_modules/
    },
    plugins:[
        new htmlWebpackPlugin({
            template: './src/views/index.pug',
            filename: '../index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            template: './src/stylesheets/index.min.css',
            filename: '../stylesheets/index.min.css'
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.pug$/, 
                loader: ['raw-loader', 'pug-html-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20 * 1024,
                        outputPath: '../images/',
                    }
                },{
                    loader: 'image-webpack-loader',  // 压缩图片
                    options: {
                      bypassOnDebug: true,
                    },
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src'],
                        minimize: false
                    }
                }
            },
        ]
    }
}