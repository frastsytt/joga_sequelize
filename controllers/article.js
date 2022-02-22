const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@localhost:3306/joga_sequelize');

const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

const getAllArticles = (req, res) => {
	Article.findAll()
	.then(articles => {
		console.log(articles)
		return res.status(200).json({ articles });
	})
	.catch(error => {
		return res.status(500).send(error.message);
	})
}


const getArticleBySlug = (req,res) => {
	Article.findOne({
		where: {
			slug : req.params.slug
		}
	})
	.then(article => {
		console.log(article)
		return res.status(200).json({ article });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
};

module.exports = {
	getAllArticles,
	getArticleBySlug
};