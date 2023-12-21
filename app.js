//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const Article = require('./models/articles.js');
require('dotenv').config();


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



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




app.route('/articles')
.get((req, res) => {
  Article
  .find()
  .then(articles => {
     //  console.log(articles);
      res.send(articles)
      // res.render('home', {homeStartingContent: homeStartingContent, articles: articles});
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

app.route('/articles/:articleName')
.get((req, res) => {
  Article
  .findOne({title: req.params.articleName})
  .then(article => {
     //  console.log(articles);
      res.send(article)
      // res.render('home', {homeStartingContent: homeStartingContent, articles: articles});
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
    //  console.log(articles);
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
    //  console.log(articles);
     res.send("Successfully updated article")
   }).catch(error => {
     res.send(error)
     console.error(error)}) 
})
.delete((req, res) => {
  Article.deleteOne(
    {title: req.params.articleName},
  ) .then(() => {
    //  console.log(articles);
     res.send("Successfully deleted article")
   }).catch(error => {
     res.send(error)
     console.error(error)}) 
})

//  home route
// app.post('/articles', (req, res) => {
//   console.log(req.body.title);
//   console.log(req.body.content);
//   const post = new Article ({
//         title: req.body.title, 
//         body: req.body.content
//       });
//       post.save()
//       .then(() => {
//           res.send('Item succedfully added to the database');
//         })
//       .catch((err) => {
//         console.log(err);
//       });
// })

// app.delete('/articles', async (req, res) => {
//   await Article.deleteMany()
//   .then(() => {
//     res.send('Items succedfully deleted');
//   })
// .catch((err) => {
//   console.log(err);
// });
// })   
// app.get('/contact', (req, res) => {
//   res.render('contact', {contactContent: contactContent});
// })

// app.get('/compose', (req, res) => {
//   res.render('compose');
// })


// app.post('/compose', (req, res) => {
//   const post = new BlogPost ({
//     title: req.body.postTitle,
//     body: req.body.postContent
//   });
// //   post.save();   

//  post.save()
//  .then(() => {
//   res.redirect('/');
// })
//       .catch((err) => {
//         console.log(err);
//       });

// });


// //  dynamic route
// app.get('/post/:postId', (req, res) => {
//   const postId = req.params.postId;
//     BlogPost 
//       .findOne({_id: postId})
//       .then((item) => {
//         const postKey = item.title
//         const postBody = item.body
//         res.render('post', {postBody: postBody, postKey: postKey})
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//  });
 

// 
// app.post('/', (req, res) => {
 

// })














app.listen(3000, function() {
  console.log("Server started on port 3000");
})
