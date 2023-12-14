const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)


// Connect to MongoDB
mongoose.connect('mongodb+srv://Course-Selling-App:Course-Selling-App@cluster0.zttzvi3.mongodb.net/Course-Selling-App-Data', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course-Selling-App-Data" });

app.listen(3000, () => console.log('Server running on port 3000'));




//====> cors :- cors is a middleware security feature. 
// it prevent to access other domain so only original domain can access.

// ====> express key features :- 
// 1) const app = express() it create a object for representing web application 
// 2) app.listen it's start the server using app.listen
// 3) Routing :- express simplify the routing handling of HTTP request by providing a routing mechenism.
// 4) Middleware :- express handle request and responce, also can modify request and responce ,
//  can terminate the request and responce life cycle and can go to the next middleware
// 5) Error Handling :- express has built-in error-handling that developer can use using custom error-handling  
