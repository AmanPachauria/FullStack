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

// admin authentication

function authenticationAdmin(req, res, next){
    const admin = req.headers;
    const adminexist = ADMIN.find( a => a.username === admin.username && a.password === admin.password );
    if( adminexist ){
        next();
    }
    else{
        res.status(403).json({message : "Admin doesn't exist"});
    }
}



// User authenticatin 
function authenticationUser(req, res, next){
    const user = req.headers;
    const userexist = USERS.find( a => a.username === user.username && a.password === user.password );
    if( userexist ){
        next();
    }
    else{
        res.status(404).json({massage : "User doesn't exist"})
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
        res.status(200).json({message: "Admin created succesfully"})
    }
})


// request fo admin login 
app.post("/admin/login", authenticationAdmin, (req, res) => {
     res.status(201).json({message : "Admin login succesfully"});
})


// create a new course 
app.post("/admin/courses", authenticationAdmin, (req, res) => {
    const course = req.body;

    course.id = Date.now();
    COURSES.push(course);
    res.status(201).json({message : "New course added succesfully"})
})

// update exist course using id 
app.put("/admin/courses/:courseId", authenticationAdmin, (req, res) => {
    // parseInt built in javascript function that convert string to integer 
    // params contain all the route acces 
    const courseId = parseInt(req.params.courseId);

    // it does not copy the course it take refrence from COURSES so if
    // we will update anithing in course that will we directly updated in COURSES
    const course = COURSES.find( a => a.id === courseId );
    if( course ){
        Object.assign( course, req.body);
        res.status(200).json({massage : "Course updated succefully"});
    }
    else{
        res.status(404).json({massage : "Course doesn't exist"});
    }

})

// get all the course 
app.get("/admin/courses", authenticationAdmin, (req, res) => {
    res.status(201).json(COURSES);
})




// user signup 
app.post("/user/signup", (req, res) => {
    const user = req.body;
    const existingUser = USERS.find( a => a.username === user.username || a.password === user.password );
    if( existingUser ){
        res.status(404).json({massage : "User allready exist with same username or Password" })
    }
    else{
        USERS.push(user);
        res.status(201).json({massage : "User created succesfully"})
    }
})

// user login 
app.post("/user/login", authenticationUser, (req, res ) => {
     res.status(201).json({massage: "User login succesfully"});
} )


// get all course that are for user or published 
app.get("/user/courses", authenticationUser, (req, res) => {
    let filteredCourses = [];
    for( let i = 0; i < COURSES.length; i++ ){
        if( COURSES[i].published ){
            filteredCourses.push(COURSES[i]);
        }
    }

    res.json({courses : filteredCourses});
})



app.listen(3000, () => {
    console.log("Server listen on Port 3000")
});