import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	entry: './app/index.js',
	output: {
		path: 'build',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1'],
				},
			},
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap') },
			{ test: /\.(eot|ttf|woff|woff2|svg)$/, loader: 'file' },
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