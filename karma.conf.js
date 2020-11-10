module.exports = (config) => {
	config.set({
		autoWatch: false,
		browsers: ['Chrome'],
		concurrency: 1,
		files: ['index.html'],
		singleRun: true
	});
};
