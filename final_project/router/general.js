const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Task 6: Complete the code for registering a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});


// Task 1: Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(friends,null,4));
});

// Task 10: Async Get the book list available in the shop
// public_users.get('/', async function (req, res) {
//     try {
//         const getBooks = async () => {
//             return books;  
//         };
//         const bookList = await getBooks();  
//         return res.status(200).send(JSON.stringify(bookList, null, 4));
//     } catch (error) {
//         return res.status(500).send("Error fetching books");
//     }
// });

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });

// Task 11: Async Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const getBookswithisbn = async () => {
            const isbn = req.params.isbn;
            return books[isbn];
        };
        const book = await getBookswithisbn();  
        return res.send(book);
    } catch (error) {
        return res.status(500).send("Error fetching books");
    }
});

  
// Task 3: Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let validBook = books.filter((book)=>{book.author === author})
    if (validBook.length > 0) {
        res.send(validBook);
    } else {
        res.send(`No book find by author ${author}`)
    }
});

// Task 12: Async Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    try {
        const getBookswithauthor = async () => {
            const author = req.params.author;
            let validBook = books.filter((book)=>{book.author === author})
            return validBook;
        };
        const book = await getBookswithauthor();  
        if (book.length > 0) {
            res.send(book);
        } else {
            res.send(`No book find by author ${author}`)
        }
    } catch (error) {
        return res.status(500).send("Error fetching books");
    }
});

// Task 4: Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let validBook = books.filter((book)=>{book.title === title})
    if (validBook.length > 0) {
        res.send(validBook);
    } else {
        res.send(`No book find by title ${title}`)
    }
});


// Task 13: Async Get book details based on title
public_users.get('/title/:title', async function (req, res) {
    try {
        const getBookswithtitle = async () => {
            const title = req.params.title;
            let validBook = books.filter((book)=>{book.title === title})
            return validBook;
        };
        const book = await getBookswithtitle();  
        if (book.length > 0) {
            res.send(book);
        } else {
            res.send(`No book find by title ${title}`)
        }
    } catch (error) {
        return res.status(500).send("Error fetching books");
    }
});

// Task 5: Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let validBook = books[isbn];
    if (validBook.length > 0) {
        res.send(validBook.review);
    } else {
        res.send(`No book find by isbn ${isbn}`)
    }
});

module.exports.general = public_users;
