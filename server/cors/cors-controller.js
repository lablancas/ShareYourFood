/* 
 * Authored by @LucasBlancas
 * 
 * Found in Git Hub
 */

exports.cors = function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9090');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
};
