class UsuariosDao {
	constructor(connection) {
		this._client = connection;
	}

	async inserirUsuario(usuario){
		try {
			await this._client.connect();
			// console.log(`Connected correctly to server`);
		
			const db = this._client.db(`got`);
		
			// Insert a single document
			await db.collection(`usuarios`).insertOne(usuario);
		
			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}

	async obterUsuario(usuario, callback){
		try {
			await this._client.connect();
			// console.log(`Connected correctly to server`);
		
			const db = this._client.db(`got`);
		
			// get a single document
			await db.collection(`usuarios`).find(usuario).toArray((err,[result]) => {
				callback(result);
			});
		
			this._client.close();
		} catch (err) {
			console.log(err.stack);
		}
	}
}
module.exports = function(){
	
	return UsuariosDao;
	
};