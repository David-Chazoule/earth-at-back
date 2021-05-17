const express = require('express');
const cors = require('cors');
const connection = require('./db');
const serverPort = process.env.PORT || 3001;
const app = express();
const Joi = require('joi');
app.use(express.json());
app.use(cors('*'));

connection.connect((err) => {
 if (err) {
 console.error('error connecting: ' + err.stack);
 } else {
 console.log('connected as id ' + connection.threadId);
 }
});

app.get ('/sellerone/:id', (req, res) =>{

  connection.promise().query('SELECT * FROM sellerone WHERE seller=?  ', [req.params.id])

  .then(([results]) => {
    res.status(200).json(results);
})
  .catch((err) => {

    console.error(err);

    res.status(500).send('Error retrieving products from db.');
  });
});


app.post ('/sellerone', (req, res) =>{

  const {seller, comment, author, rating} = req.body;

  const { error: validationErrors } = Joi.object({
    seller: Joi.string().max(255).required(),
    comment: Joi.string().max(255).required(),
    author: Joi.string().max(255).required(),
    rating: Joi.string().max(10).required(),
  }).validate({ seller, comment, author, rating }, {abortEarly: false});

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection.promise()
    .query('INSERT INTO sellerone ( seller, comment, author, rating) VALUES (?, ?, ?, ?)', [ seller, comment, author, rating])
    .then(([result]) => {
      const createComment = { id: result.insertId, seller, comment, author, rating };
      res.json(createComment);
    }).catch((err) => { console.error(err); res.sendStatus(500); });
  }
}); 

app.post ('/contacts', (req, res) =>{

  const {firstname, lastname, email, comment} = req.body;

  const { error: validationErrors } = Joi.object({
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    comment: Joi.string().max(255).required(),
  }).validate({ firstname, lastname, email, comment }, {abortEarly: false});

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection.promise()
    .query('INSERT INTO contacts (firstname, lastname, email, comment) VALUES (?, ?, ?, ?)', [firstname, lastname, email, comment])
    .then(([result]) => {
      const createContact = { id: result.insertId, firstname, lastname, email, comment };
      res.json(createContact);
    }).catch((err) => { console.error(err); res.sendStatus(500); });
  }
}); 
 
app.listen(serverPort, () => {
  console.log(`Server is running on ${serverPort}`);
});