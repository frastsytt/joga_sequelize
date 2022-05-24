// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:password@localhost:3306/yoga_sequelize');

// read model data for table representation
const models = require('../../models')


// create new
const createArticle = (req, res) => {
	let name = req.body.name
	let slug = req.body.slug
	let image = req.body.image
	let body = req.body.body
	console.log(req.body)
	console.log(name)
	console.log(slug)
	console.log(image)
	console.log(body)




	const newArticle = models.Article.create({
		name: name,
		slug: slug,
		image: image,
		body: body,
		published: new Date().toISOString().slice(0, 19).replace('T', ' ')
	})
	.then(article => {
		console.log(article)
		return res.status(200).json({ message: 'Added a new article' });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
}


const updateArticle = (req, res) => {
	let name = req.query.name
	let slug = req.query.slug
	let image = req.query.image
	let body = req.query.body

	models.Article.update({
		name: name,
		slug: slug,
		image: image,
		body: body,
	},
	{where: {id: req.params.id}})
	.then(article => {
		console.log(article)
		return res.status(200).json({ message: 'Article updated!'});
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
}



// export controller functions
module.exports = {
	createArticle,
	updateArticle
}