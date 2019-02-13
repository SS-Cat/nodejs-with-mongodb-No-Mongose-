module.exports = function(application){
	application.get(`/cadastro`, (req, res) => {
		application.controllers.cadastro.render(application, req, res);
	});

	application.post(`/cadastrar`, (req, res) => {
		application.controllers.cadastro.cadastrar(application, req, res);
	});
};