let path = require('path');
let webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			loader: 'css-loader'
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			loader: 'file-loader'
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
		},
		{
			test: /\.html$/,
			loader: 'html-loader'
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
		modules: ['node_modules'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
}
