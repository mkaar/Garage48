import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	entry: './app/index.js',
	output: {
		publicPath: ``,
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
				exclude: [/node_modules/],
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?sourceMap!less?sourceMap'
				),
			},
			{
				test: /\.(eot|ttf|woff|woff2|png|svg)$/,
				loader: 'url-loader?limit=15000',
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'app/index.html',
		}),
		new ExtractTextPlugin('styles.css'),
	],
	devtool: 'eval',
};