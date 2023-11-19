// Here require function is used to import express.js module 
// now const express holds the express.js framwork 
const express = require("express");

// here we are creating in instance express application
// now using app we can object we will configure routes, middleware and handle https request
const app = express();


// this line add middleware to the express application 
// middleware functions are functions that have access to the request, responce and next middleware function 

// here express.json() parse incoming json request and put data into body so we can use it easily 
app.use(express.json());

let ADMIN = [];
let USERS = [];
let COURSES = [];


// request for admin signup 
