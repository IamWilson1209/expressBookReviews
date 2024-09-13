const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let validUsername = users.filter((user) => {
        return user.username === username;
    });
    if (validUsername.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    if (validUsers.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Task 7: only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Task 8: Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let book = books[isbn];  
    if (book) {  // Check if book exists
        let review = req.body.review;

        if (review) {
            book["review"] = review;
        }

        books[isbn] = book;  // Update book details in 'books' object
        res.send(`Book with the isbn ${isbn} updated.`);
    } else {
        res.send("Unable to find book!");
    }
});


// Task 9: Complete the code for deleting a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (isbn) {
        delete books[isbn];
    }
    res.send(`Book with the isbn ${isbn} deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
