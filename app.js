const express = require("express");
const mongoose = require("mongoose");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogsRoutes");
// express app
const app = express();

const dbURl =
  "mongodb+srv://x0xl0ma:384609@nodetut.jvzmb.mongodb.net/tutorial?retryWrites=true&w=majority";

mongoose
  .connect(dbURl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
