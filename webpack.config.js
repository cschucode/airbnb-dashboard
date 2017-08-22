module.exports = {
	entry: './app/main.js',
	output: {
		path: 'public/scripts',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: './app',
		port: 8100
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
		]
	}
}
