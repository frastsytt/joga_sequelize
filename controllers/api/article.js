// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:password@localhost:3306/yoga_sequelize');

// show article by this slug
const models = require("../../models");
const getArticleBySlug = (req, res) => {
    console.log(req)
    if (Object.keys(req.query).length === 0){
        return res.status(400).json({ 'error': 'Invalid request'});
    }else if(req.query.q === ''){
        return res.status(400).json({ 'error': 'Invalid request'});
    }else {
        console.log(req)
        models.Article.findOne({
            where: {
                slug: req.query.q
            },
            include: [{
                model: models.Authors
            },
                {
                    model: models.Tags,
                    through: {
                        model: models.ArticleTag
                    }
                }],
        })
            .then(article => {
                console.log(article)
                return res.status(200).json({article});
            })
            .catch(error => {
                return res.status(500).send(error.message);
            })
    }
};

module.exports = {
    getArticleBySlug
}