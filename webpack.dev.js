'use strict'

const path=require('path')

const webpack=require('webpack')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
module.exports={
    entry:{
        index: './src/index.js',
        search: './src/search.js'
    },
    output:{
        path: path.join(__dirname,'dist'),
        filename: '[name].js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"babel-loader"
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
                   {
                       loader:'px2rem-loader',
                       options:{
                           remUnit:75,
                           remPrecision:8
                       }
                    }
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    },
    plugins:[
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
}