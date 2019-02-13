module.exports = {
	render(application, req, res) {
		res.render(`cadastro`, { validation: ``, data: ``});
	},

	cadastrar: function (application, req, res) {
		const data = req.body;

		req.assert(`nome`, `Nome não pode ser vazio`).notEmpty();
		req.assert(`usuario`, `Usuario não pode ser vazio`).notEmpty();
		req.assert(`senha`, `Senha não pode ser vazia`).notEmpty();
		req.assert(`senha`, `Tamanho da senha deve ser maior que 6`).len(6, 20);
		req.assert(`casa`, `Casa tem de ser selecionada`).notEmpty();

		const error = req.validationErrors();
		if (error) {
			res.render(`cadastro`, {
				validation: error,
				data: data
			});
			return;
		}

		const connection = application.dbConnection();
		const UsuariosDao = new application.models.UsuariosDAO(connection);
		const JogoDao = new application.models.JogoDAO(connection);

		UsuariosDao.inserirUsuario(data);
		JogoDao.gerarParametros(data.usuario);
		
		res.redirect(`/`);
	}
};