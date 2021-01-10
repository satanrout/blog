const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://satanrout:rout9090@cluster0.75wca.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host", req.hostname);
//   console.log("path", req.path);
//   console.log("method", req.method);
//   next();
// });

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new plog post 3 bitches",
    snippet: "about my new blog post",
    body: "more about my new blog post",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5ff6aa53e0930e310342c85f")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

//redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
