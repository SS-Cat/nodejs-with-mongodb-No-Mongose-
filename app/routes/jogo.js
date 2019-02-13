module.exports = function(application){
	application.get(`/jogo`, function(req, res){
		application.controllers.jogo.render(application, req, res);
	});

	application.get(`/sair`, function(req, res){
		application.controllers.jogo.sair(application, req, res);
	});

	application.get(`/suditos`, function(req, res){
		application.controllers.jogo.suditos(application, req, res);
	});

	application.get(`/pergaminhos`, function(req, res){
		application.controllers.jogo.pergaminhos(application, req, res);
	});

	application.post(`/ordenar_acao_sudito`, function(req, res){
		application.controllers.jogo.acaoSuditos(application, req, res);
	});

	application.get(`/revogar_acao_sudito`, function(req, res){
		application.controllers.jogo.revogarAcao(application, req, res);
	});	
};