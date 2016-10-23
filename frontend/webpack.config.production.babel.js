import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	entry: './app/index.js',
	output: {
		path: 'build',
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'stage-1'],
				},
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?sourceMap!less?sourceMap'
				),
				exclude: /node_modules/,
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg|png)$/,
				loader: 'url-loader?limit=15000',
				exclude: /node_modules/, },
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'app/index.html',
		}),
	],
	devtool: 'sourcemap',
};