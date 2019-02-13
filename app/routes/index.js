module.exports = function(application){
	application.get(`/`, function(req, res){
		application.controllers.index.render(application, req, res);
	});

	application.post(`/autenticar`, function(req, res){
		application.controllers.index.autenticar(application, req, res);
	});
};