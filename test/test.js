let chai = require('chai');
let chaiHttp = require('chai-http')
var assert = require('assert');
const { request } = require('http');
let should = chai.should();
chai.use(chaiHttp);
var crypto = require("crypto");
chai.use(require('chai-json'))
var expect = chai.expect;

describe('Test article manipulation', function(){
    describe('Test creating a new dummy article', function() {
        it('Send dummy article', function(done) {
            chai.request('http://localhost:3000')
                .post('/admin/article/create')
                .send({ 'name': 'test_tmp', 'slug': crypto.randomBytes(20).toString('hex'), 'image': 'test_tmp_img', 'body': 'test_tmp_body' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                })
        })
    });
    describe('Test editing the dummy article', function() {
        it('Edit dummy article', function(done) {
            chai.request('http://localhost:3000')
                .post('/admin/article/edit/13')
                .send({ 'name': 'test_tmp_edited', 'slug': 'test_tmp_slug_edited', 'image': 'test_tmp_img_edited', 'body': 'test_tmp_body_edited' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                })
        })
    });
    describe('Test getting all available articles', function() {
        it('Get all articles ("/")', function(done) {
            chai.request('http://localhost:3000')
                .get('/')
                .end((err, res) => {
                    expect(res.body.articles).to.have.length.above(0);
                    console.log(res.body.articles.length);
                    res.should.have.status(200);
                    done()
                })
        })
    });
});


//let name = req.query.name
//let slug = req.query.slug
//let image = req.query.image
//let body = req.query.body