var path = require( 'path' );
var WriteFilePlugin = require( 'write-file-webpack-plugin/dist' ).default;
var LessPluginNPMImport = require( 'less-plugin-npm-import' );

module.exports = {
  entry: [
    'babel-polyfill',
    './src/game/pong.less',
    './src/index.js',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    publicPath: '/dist',
    path: path.join( __dirname, './dist' ), //for WriteFilePlugin
    filename: 'bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [ {
      test: /\.js$/,
      include: path.join( __dirname, 'src' ),
      loader: 'babel-loader',
      query: {
        presets: [ 'es2015', 'stage-0' ]
      }
    }, {
      test: /\.less$/,
      loader: "style!css!autoprefixer!less" //NB loaders are applied right-to-left
    }, ]
  },
  //for webpack-dev-server
  devServer: {
    contentBase: "./src",
    outputPath: path.join( __dirname, './dist' ) //for WriteFilePlugin
  },
  plugins: [
    //forces webpack-dev-server to create bundle.js file
    new WriteFilePlugin()
  ],
  lessLoader: {
    lessPlugins: [
      new LessPluginNPMImport( {
        prefix: 'npm://'
      } )
    ]
  }
};
