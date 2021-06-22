const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://newuser:newuser@cluster0.kcukv.mongodb.net/book?retryWrites=true&w=majority",{useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        // required: true,
    },
    author: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    isbn: {
        type: Number,
        // required: true,
    },
    edition: {
        type: Number,
        // required: true,
    },
    pages: {
        type: Number,
        // required: true,
    },
});

const User = new mongoose.model("User", userSchema);
const Book = new mongoose.model("Book", bookSchema);

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/home", function(req, res){
    res.render("home");
});

app.get("/register", function(req,res){
    res.render("register");
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/addbook", function(req,res){
    res.render("addbook");
});

app.get("/listofbooks", function(req, res){
    Book.find({},function(err,foundBook){
        if(err){
            console.log(err);
        }else{
         res.render("listofbooks", {booklist: foundBook});
        }
    })
});

app.post("/register", function(req, res){
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("login");
        }
    });
});

app.post("/login", function(req, res){
    
    const lusername = req.body.username
    const lpassword = req.body.password
    User.findOne({username: lusername},function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password === lpassword){
                    res.render("home");
                }
            }
        }
    });
});

app.post("/addbook", function(req, res){
    const newBook = new Book({
        bookname: req.body.bookname,
        author: req.body.author,
        price: req.body.price,
        isbn: req.body.isbn,
        edition: req.body.edition,
        pages: req.body.pages,
    });
    
    newBook.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("home");
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
    console.log("server started on port 3000");
});
