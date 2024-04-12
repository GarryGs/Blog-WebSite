import express from "express";
// import bodyParser from "body-parser"      // not needed now , because now it is incorporated as a part of express

const app = express();
const port = 3000;

var posts = [];

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log(posts);
    res.render("index.ejs", {allPosts: posts});
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/post/:postId", (req, res) => {
    var req_post = posts[req.params.postId];
    res.render("post.ejs", {post: req_post});
})

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
    const postTitle = req.body["postTitle"];
    const postBody = req.body["postContent"];

    const post = {
        title: postTitle,
        body: postBody,
    };

    posts.push(post);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});