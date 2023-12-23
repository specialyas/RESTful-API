//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const Article = require('./models/articles.js');
require('dotenv').config();


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose
.connect(process.env.DBCONNECTION)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log(err);
});



// routing for all articles 
app.route('/articles')
.get((req, res) => {
  Article
  .find()
  .then(articles => {
      res.send(articles)
    }).catch(error => {
      res.send(error)
      console.error(error)}) 
})
.post((req, res) => {
  console.log(req.body.title);
  console.log(req.body.content);
  const post = new Article ({
        title: req.body.title, 
        body: req.body.content
      });
      post.save()
      .then(() => {
          res.send('Item succedfully added to the database');
        })
      .catch((err) => {
        console.log(err);
      });
})
.delete(async (req, res) => {
  await Article.deleteMany()
  .then(() => {
    res.send('Items succedfully deleted');
  })
.catch((err) => {
  console.log(err);
});
})


// routing for a specific article
app.route('/articles/:articleName')
.get((req, res) => {
  Article
  .findOne({title: req.params.articleName})
  .then(article => {
      res.send(article)
    }).catch(error => {
      res.send(error)
      console.error(error)}) 
})
.put((req, res) => {
  Article.updateMany(
    {title: req.params.articleName},
    { title: req.body.title, 
      body: req.body.content},
      {overwrite: true},
  ) .then(() => {
     res.send("Successfully update article")
   }).catch(error => {
     res.send(error)
     console.error(error)}) 
})
.patch((req, res) => {
  Article.updateOne(
    {title: req.params.articleName},
    { $set: req.body},
  ) .then(() => {
     res.send("Successfully updated article")
   }).catch(error => {
     res.send(error)
     console.error(error)}) 
})
.delete((req, res) => {
  Article.deleteOne(
    {title: req.params.articleName},
  ) .then(() => {
     res.send("Successfully deleted article")
   }).catch(error => {
     res.send(error)
     console.error(error)}) 
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
