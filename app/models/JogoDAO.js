const objectId = require(`mongodb`).ObjectId;
class JogoDAO {
	constructor(connection) {
		this._client = connection;
	}

	async gerarParametros(usuario) {
		try {
			await this._client.connect();
			// console.log(`Connected correctly to server`);

			const db = this._client.db(`got`);

			// Insert a single document
			await db.collection(`jogo`).insertOne({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});

			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}

	async iniciaJogo(usuario, callback) {
		try {
			await this._client.connect();
			// console.log(`Connected correctly to server`);

			const db = this._client.db(`got`);
			console.log(usuario);


			// get a single document
			await db.collection(`jogo`).find({
				usuario: usuario
			}).toArray((err, [result]) => {
				console.log(result);
				callback(result);
			});

			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}

	async acao(action) {
		try {
			await this._client.connect();
			const db = this._client.db(`got`);

			let tempo = undefined;
			switch (parseInt(action.acao)) {
			case 1: tempo = 1 * 60 * 60 * 1000; break;
			case 2: tempo = 2 * 60 * 60 * 1000; break;
			case 3: case 4: tempo = 5 * 60 * 60 * 1000; break;
			}
			action.acao_end = new Date().getTime() + tempo;
			await db.collection(`acao`).insertOne(action);

			let moedas = undefined;
			switch (parseInt(action.acao)) {
			case 1: moedas = -2 * action.quantidade; break;
			case 2: moedas = -3 * action.quantidade; break;
			case 3: case 4: moedas = -1 * action.quantidade; break;
			}

			await db.collection(`jogo`).updateOne({ usuario: action.usuario}, { $inc: {moeda: moedas}});


			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}

	async getAcoes(usuario, callback) {
		try {
			await this._client.connect();
			const db = this._client.db(`got`);
			
			const moment = new Date().getTime();

			await db.collection(`acao`).find({
				usuario: usuario,
				acao_end: {$gt: moment}
			}).toArray((err, result) => {
				callback(result);
			});

			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}

	async revogarAcao(_id, callback) {
		try {
			await this._client.connect();
			const db = this._client.db(`got`);
			
			await db.collection(`acao`).removeOne( { _id: objectId(_id)})
				.then((result) => {
					callback(result);
				}).catch((err) => {
					console.log(err.stack);
				});

			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}

}

module.exports = function () {
	return JogoDAO;
};