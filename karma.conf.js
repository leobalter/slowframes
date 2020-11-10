module.exports = (config) => {
	config.set({
		autoWatch: false,
		browsers: ['Chrome'],
		concurrency: 1,
		files: ['index.js'],
		frameworks: ['jasmine'],
		singleRun: true
	});
};
