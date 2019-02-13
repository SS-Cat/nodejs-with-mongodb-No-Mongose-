module.exports = {
	render(application, req, res) {
		if (req.session.autorizado !== true) {
			res.render(`index`, {validation: [{msg: `Faça Login`}], input: ``});
			return;
		}

		const erros = req.query.invalid;
		
		const pass = req.query.valid;

		const JogoDao = new application.models.JogoDAO(application.dbConnection());

		JogoDao.iniciaJogo(req.session.usuario, (result) => {
			res.render(`jogo`, { 
				pass: pass, 
				validation: erros, 
				img_casa: req.session.casa, 
				parametros: result
			});
		});

	},

	sair(application, req, res) {
		req.session.destroy((err) => {
			if (err) res.send(err.stack);
			res.render(`index`, {validation: [{msg: `Até a proxima`}], input: ``});
		});
	},

	pergaminhos(application, req, res) {
		if (req.session.autorizado !== true) {
			res.send(`Logue em uma conta`);
			return;
		}

		const JogoDao = new application.models.JogoDAO(application.dbConnection());

		JogoDao.getAcoes(req.session.usuario, (result) => {
			res.render(`pergaminhos`, { data: result});
		});

	},
	
	suditos(application, req, res) {
		if (req.session.autorizado !== true) {
			res.send(`Logue em uma conta`);
			return;
		}


		res.render(`aldeoes` , { validation: ``});
	},

	acaoSuditos(application, req, res) {
		const data = req.body;
		data.usuario = req.session.usuario;

		req.assert(`acao`, `Ação deve ser informada`).notEmpty();
		req.assert(`quantidade`, `Quantidade deve ser informada`).notEmpty();
		const erros = req.validationErrors();
		if(erros) {
			let errQuery = JSON.stringify(erros);
			res.redirect(`jogo?invalid=${errQuery}`);
			return;
		}

		// console.log(data);
		const JogoDAO = new application.models.JogoDAO(application.dbConnection());
		JogoDAO.acao(data);

		res.redirect(`jogo?valid=sucess`);
		
	},

	revogarAcao(application, req, res) {
		const urlQuery = req.query;
		
		const JogoDAO = new application.models.JogoDAO(application.dbConnection());
		JogoDAO.revogarAcao(urlQuery.id, (result) => {
			res.redirect(`jogo?valid=removed`);
		});
	}

};

/*
Session {
  cookie:
   { path: '/',
     _expires: null,
     originalMaxAge: null,
     httpOnly: true },
  autorizado: true,
  usuario: 'doBairro',
  casa: 'arryn' }


query {}

data

erros [ { param: 'senha', msg: 'Senha não pode ser vazia', value: '' } ]
*/