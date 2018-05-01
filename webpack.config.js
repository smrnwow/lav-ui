let path = require('path');
let webpack = require('webpack');

module.exports = {
	entry: ['./src/styles/index.css', './src/index.js'],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'build'),
		library: 'library',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.vue$/,
			exclude: /node_modules/,
			loader: 'vue-loader'
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default']
		})
		// new webpack.DefinePlugin({
		// 	"process.env": {
		// 		NODE_ENV: JSON.stringify("production")
		// 	}
		// }),
		// new webpack.LoaderOptionsPlugin({
		// 	minimize: true,
		// 	debug: false
		// }),
		// new webpack.optimize.UglifyJsPlugin({
		// 	beautify: false,
		// 	comments: false
		// })
	],
	devServer: {
		contentBase: path.join(__dirname),
		port: 8081
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js?123',
			'@assets': 'assets/'
		}
	}
}
