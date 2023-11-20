// Here require function is used to import express.js module 
// now const express holds the express.js framwork 
const express = require("express");


const jwt = require("jsonwebtoken");

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


const secretKey = "superSecret1e123456789";


function generateJwt(user){
    const payload = { username : user.username, };
    return jwt.sign(payload, secretKey, { expiresIn : "1h"});
}

function jwtAuthentication(req, res, next) {
    const authHeader = req.headers.authorization;

    if( authHeader ){
        // here we are copying token from authHeader using split 
       // split convert a string into array based on space
       const token = authHeader.split(' ')[1];

       jwt.verify(token, secretKey, (err, user) => {
           if (err) {
              res.sendstatus(403);
           }

           req.user = user;
           next();
       })
    }
    else{
        res.status(403).json({message : "Please Enter valid authorization key"});
    }
}

// request for admin signup 
app.post("/admin/signup", (req, res) => {
    const admin = req.body;
    const existingAdmin = ADMIN.find(a => a.username === admin.username || a.password === admin.password );
    if( existingAdmin ){
        res.status(403).json({message: "Admin Allready exist"});
    }
    else{
        ADMIN.push(admin);
        const token = generateJwt(admin);
        res.status(200).json({message: "Admin created succesfully", token})
    }
})


// request fo admin login 
app.post("/admin/login", (req, res) => {
     const {username, password} = req.headers;
     const admin = ADMIN.find( a => a.username === username && a.password === password );
     if( admin ){
        const token = generateJwt(admin);
        res.json({message : "Admin login succesfully", token});
     }
     else{
        res.status(403).json({message : "Admin not found"});
     }
     
})


// create a new course 
app.post("/admin/courses", jwtAuthentication, (req, res) => {
    const course = req.body;

    course.id = Date.now();
    COURSES.push(course);
    res.status(201).json({message : "New course added succesfully"})
})

// update exist course using id 
app.put("/admin/courses/:courseId", jwtAuthentication, (req, res) => {
    // parseInt built in javascript function that convert string to integer 
    // params contain all the route acces 
    const courseId = parseInt(req.params.courseId);

    // it does not copy the course it take refrence from COURSES so if
    // we will update anithing in course that will we directly updated in COURSES
    const course = COURSES.find( a => a.id === courseId );
    if( course ){
        Object.assign( course, req.body);
        res.status(200).json({message : "Course updated succefully"});
    }
    else{
        res.status(404).json({message : "Course doesn't exist"});
    }

})

// get all the course 
app.get("/admin/courses", jwtAuthentication, (req, res) => {
    res.status(201).json(COURSES);
})




// user signup 
app.post("/users/signup", (req, res) => {

    const user = {
        username : req.body.username,
        password : req.body.password,
        purchasedCourses : []
    }
    const existingUser = USERS.find( a => a.username === user.username || a.password === user.password );
    if( existingUser ){
        res.status(404).json({message : "User allready exist with same username or Password" })
    }
    else{

        USERS.push(user);
        const token = generateJwt(user);
        res.status(201).json({message : "User created succesfully", token})
    }
})

// user login 
app.post("/users/login", (req, res ) => {
    const {username, password} = req.headers;
    const user = USERS.find( a => a.username === username && a.password === password );

    if( user ){
        const token = generateJwt(user);
        res.status(201).json({message: "User login succesfully", token});
    }
    else{
        res.status(403).json({message : "User authentication failed"});
    }
} )


// get all course that are for user or published 
app.get("/users/courses", jwtAuthentication, (req, res) => {
    let filteredCourses = [];
    for( let i = 0; i < COURSES.length; i++ ){
        if( COURSES[i].published === true){
            filteredCourses.push(COURSES[i]);
        }
    }

    res.json({courses : filteredCourses});
})

app.post('/users/courses/:courseId', jwtAuthentication, (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = COURSES.find(a => a.id === courseId && a.published);
    if (course) {

        const user = USERS.find( a => a.username === req.user.username );
        if( user ){
            if( ! user.purchasedCourses ){
                user.purchasedCourses = [];
            }
             //   this id will store in user purchasedCourses array 
             user.purchasedCourses.push(course);
             res.json({ message: 'Course purchased successfully' });
        }
        else{
            res.status(404).json({ message: 'User not available' });
        }
    } else {
      res.status(404).json({ message: 'Course not found or not available' });
    }
});

app.get("/users/purchasedCourses", jwtAuthentication, (req, res) => {

    const user = USERS.find( a => a.username === req.user.username )
    if( user && user.purchasedCourses ){
        res.json({courses : user.purchasedCourses })
    }
    else{
        res.json({message : "User not found"});
    }
})

app.listen(3000, () => {
    console.log("Server listen on Port 3000")
});