module.exports = (config) => {
	config.set({
		autoWatch: false,
		browsers: ['Chrome'],
		concurrency: 1,
		files: ['index.js'],
		frameworks: ['benchmark'],
		reporters: ['benchmark'],
		singleRun: true
	});
};
