module.exports = (config) => {
	config.set({
		autoWatch: false,
		browsers: ['Chrome', 'Firefox', 'Safari'],
		concurrency: 1,
		files: ['index.js'],
		frameworks: ['jasmine'],
		singleRun: true
	});
};
