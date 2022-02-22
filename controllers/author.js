// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:password@localhost:3306/yoga_sequelize');

// read model data for table representation
const models = require('../models')




// show article by this slug
const getArticlesByAuthor = (req, res) => {
	console.log(req.params.id)
	models.Authors.findByPk(req.params.id, {
		include: [{
			model:models.Article
		}],
	})
	.then(article => {
		console.log(article)
		return res.status(200).json({ article });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
};

// export controller functions
module.exports = {
	getArticlesByAuthor
}