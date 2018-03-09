'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
  
});
  
describe('404 handler', function () {
  
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/bad/path')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
  
});

describe('GET /api/notes', function () {
  
  it('Testing our get response', function() {
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.have.all.keys('id', 'title', 'content');
        });
      });
  });
});

describe('GET /api/notes/:id', function() {
  
  it('should return correct single item note', function() {
    return chai.request(app)
      .get('/api/notes/1003')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1003);
        expect(res.body.title).to.equal('7 things lady gaga has in common with cats');
        expect(res.body.content).to.equal('Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.');
      });
  });
});

describe('PUT /api/notes/:id', function() {

  it('should update individual note', function() {
    const updateNote = {
      'title': 'Golden State Warriors',
      'content': 'NBA Champs!'
    };
    return chai.request(app)
      .put('/api/notes/1000')
      .send(updateNote)
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1000);
        expect(res.body.title).to.equal(updateNote.title);
        expect(res.body.content).to.equal(updateNote.content);
      });
  });

  it('should respond with a 404 for an invalid id', function () {
    const updateItem = {
      'title': 'What about dogs?!',
      'content': 'woof woof'
    };
    return chai.request(app)
      .put('/api/notes/9999')
      .send(updateItem)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

  it('should return an error when missing "title" field', function () {
    const updateItem = {
      'foo': 'bar'
    };
    return chai.request(app)
      .put('/api/notes/9999')
      .send(updateItem)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});

describe('POST /api/notes', function() {
  
  it('should create new note with valid title and content', function() {
    const newNote = {
      'title': 'Cohort e19',
      'content': 'Best class!'
    };
    return chai.request(app)
      .post('/api/notes')
      .send(newNote)
      .then(function (res) {
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res).to.have.status(201);
        expect(res.body.id).to.equal(1010);
        expect(res.body.title).to.equal(newNote.title);
        expect(res.body.content).to.equal(newNote.content);
        expect(res).to.have.header('location');
      });
  });

  it('should return an error when missing "title" field', function () {
    const newItem = {
      'foo': 'bar'
    };
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});

describe('DELETE /api/notes/:id', function() {
  it('should delete a single note by id', function() {
    return chai.request(app)
      .delete('/api/notes/1003')
      .then(function (res) {
        expect(res).to.have.status(204);
      });
  });

  it('should return 404 error for invalid id', function () {
    return chai.request(app)
      .delete('/api/notes/1234')
      .catch(err => err.response)
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });
});
