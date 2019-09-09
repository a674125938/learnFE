'use strict'

const glob=require('glob')
const path=require('path')
const webpack=require('webpack')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')

const setMPA = () => {
    const entry={};
    const htmlWebpackPlugin=[];
    
    const entryFiles=glob.sync(path.join(__dirname,'src/*/index.js'))
    //console.log('entryFiles',entryFiles)
    Object.keys(entryFiles)
    .map((index) => {
        const entryFile=entryFiles[index];
        const match=entryFile.match(/src\/(.*)\/index\.js/);
        const pageName=match && match[1];
        //console.log('pageName',pageName)

        entry[pageName]=entryFile;
        htmlWebpackPlugin.push(
                //用于压缩html 多个入口需要个自定义
                new HtmlWebpackPlugin({
                    template:path.join(__dirname,`src/${pageName}/index.html`),
                    filename:`${pageName}.html`,
                    chunks:[pageName],
                    inject:true,
                    minify:{
                        html5:true,
                        collapseWhitespace:true,
                        preserveLineBreaks:false,
                        minifyCSS:true,
                        minifyJS:true,
                        removeComments:false
                    }
                })
        )
    })
    return {
        entry,
        htmlWebpackPlugin
    }
}
const {entry , htmlWebpackPlugin} = setMPA()
module.exports={
    entry:entry,
    output:{
        path: path.join(__dirname,'dist'),
        filename: '[name][chunkhash:8].js'
    },
    mode:'production',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"babel-loader"
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader:'postcss-loader'
                       
                    },
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
                        loader:'file-loader',
                        options:{
                            name:'[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        //用于打包出独立的css
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        }),
        //用于压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
        }),
        //自动删除dist打包目录
        new CleanWebpackPlugin(),
        
    ].concat(htmlWebpackPlugin),
   
}