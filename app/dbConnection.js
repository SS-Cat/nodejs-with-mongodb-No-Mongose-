var mongoClient = require(`mongodb`).MongoClient;

module.exports = function () {
	
	return () => {
		return new mongoClient(`mongodb://localhost:27017`);
	};
};