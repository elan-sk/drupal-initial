const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FontPreloadPlugin = require('webpack-font-preload-plugin');

exports.configureDevServer = (serverAddress, publicPath, port, siteURL) => ({
  allowedHosts: [ serverAddress ],
  host: serverAddress,
  client: {
    logging: 'error',
    progress: false,
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  devMiddleware: {
    publicPath: publicPath,
    writeToDisk: (filePath) => {
      return !(/hot-update/.test(filePath));
    },
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  hot: true,
  liveReload: true,
  watchFiles: [
    '../../**/*.twig',
  ],
  open: true,
  port,
  proxy: {
    '**': {
      target: siteURL,
      secure: false,
      changeOrigin: true,
    }
  },
  static: {
    publicPath: publicPath,
  },
});

exports.extractScss = ({mode = 'production'}) => ({
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, 'postcss.config.js'),
            },
          }
        },
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: mode === 'production' ? 'css/[chunkhash].css' : 'css/[id].css',
    }),
  ],
});

exports.extractJs = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'esbuild-loader',
          options: {
            target: 'es2015'
          }
        }
      },
    ]
  }
});

exports.extractImages = ({ publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img-dist/',
              publicPath: publicPath + '/img-dist/',
              esModule: false,
              name: '[contenthash].[ext]',
            },
          },
        ],
        type: 'javascript/auto',
      },
    ]
  }
})

exports.extractFonts = ({ publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              publicPath: publicPath + '/fonts/',
              name: '[contenthash].[ext]',
            },
          },
        ],
        type: 'javascript/auto',
      }
    ]
  }
})

exports.cleanDistFolders = () => ({
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: [
        path.join(__dirname, '../../assets/js/**'),
        path.join(__dirname, '../../assets/css/**'),
        path.join(__dirname, '../../assets/img-dist/**'),
        path.join(__dirname, '../../assets/fonts/**')
      ],
    }),
  ]
})

exports.preloadFonts = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'preload.html',
      templateContent: '{{{preloadLinks}}}',
      inject: false,
    }),
    new FontPreloadPlugin({
      index: 'preload.html',
      extensions: ['woff2'],
      replaceCallback: ({ indexSource, linksAsString }) => {
        return indexSource.replace('{{{preloadLinks}}}', linksAsString);
      },
    }),
  ]
})
