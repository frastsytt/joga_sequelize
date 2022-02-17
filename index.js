const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@localhost:3306/joga_sequelize');

sequelize
	.authenticate()
	.then(() => {
		console.log("Edukas sisselogimine");
	})
	.catch(err => {
		console.error('Unable to connect', err);
	});

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to sequelize application.'});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});