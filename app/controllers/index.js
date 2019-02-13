module.exports = {
	render(application, req, res){
		res.render(`index`, {validation: ``, input: ``});
	},
	autenticar(application, req, res){
		const data = req.body;

		req.assert(`usuario`, `Nome não pode ser vazio`).notEmpty();
		req.assert(`senha`, `Senha não pode ser vazia`).notEmpty();

		const erros = req.validationErrors();
		if(erros){
			res.render(`index`, {validation: erros, input: data});
			return;
		}

		const UsuariosDAO = new application.models.UsuariosDAO(application.dbConnection());

		UsuariosDAO.obterUsuario(data,result => {
			if (result) {
				req.session.autorizado = true;
				req.session.usuario = result.usuario;
				req.session.casa = result.casa;
			}

			if (req.session.autorizado) {
				res.redirect(`jogo`);
			} else {
				res.render(`index`, {validation: [{msg: `usuario não existe`}], input: ``});
			}
		});
		
		// res.send(`okay`);
	}
};