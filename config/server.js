/* importar o módulo do framework express
importar o módulo do consign
importar o módulo do body-parser
importar o módulo do express-validator
importar o módulo do express-session */
const express = require(`express`);
const consign = require(`consign`);
const bodyParser = require(`body-parser`);
const expressValidator = require(`express-validator`);
const expressSession = require(`express-session`);

/* iniciar o objeto do express */
const app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set(`view engine`, `ejs`);
app.set(`views`, `./app/views`);

/* configurar o middleware express.static
configurar o middleware body-parser
configurar o middleware express-validator 
configurar o middleware express-session */
app.use(express.static(`./app/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({secret: `ahasduqda`, resave: false, saveUninitialized: false}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign({
	cwd: `app`
})
	.include(`routes`)
	.then(`models`)
	.then(`controllers`)
	.then(`dbConnection.js`)
	.into(app);

/* exportar o objeto app */
module.exports = app;