var webpack = require('webpack');
module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './app2/index'
  ],
  // devtool: '#eval-source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  target: 'web',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      // { test: /.*app2.*\.jsx?$/, loaders: ['6to5-loader?{"blacklist": ["forOf"]}', 'jsx'] },
      // { test: /.*app2.*\.jsx?$/, loaders: ['6to5-loader?{"blacklist": ["forOf"]}', 'jsx'] },
      { test: /.*app2.*\.jsx?$/, loaders: ['es6-loader', 'jsx'] },
      // { test: /.*app2.*\.jsx?$/, loaders: ['jsx'] },
    ]
  }
};
