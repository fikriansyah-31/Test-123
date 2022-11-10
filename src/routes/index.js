const express = require('express')

const router = express.Router()

// Controller
// import controller here
const { auth } = require("../middlewares/auth");
const {addUsers, getUser, getUsers} = require('../controller/user')
const {register, login} = require('../controller/auth')
const {getQuotes, addQuotes, getDetailQuotes, updateQuotes,deleteQuotes} = require('../controller/quotes')


// Route
// add route here
router.post('/user', addUsers)
router.get('/users', getUser)
router.get('/user/id', getUsers)

// Regis dan Login
router.post("/register", register);
router.post("/login", login);

//Quotes
router.post("/quotes", auth, addQuotes);
router.get("/quotes", auth,getQuotes);
router.get("/quotes/:id", auth ,getDetailQuotes);
router.patch("/quotee/:id", auth, updateQuotes);
router.delete("/quote/:id", auth, deleteQuotes);




module.exports = router