const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// function middleware1( req, res, next ){
//     console.log("From iside middleware " + req.headers.counter);
//     next();
// }

// app.use(middleware1); 
app.use(bodyParser.json());

function calcuteSum(number){
    var sum = 0;
    for( var i = 1; i <= number; i++ ){
        sum += i;
    }

    return sum;
}

function calcuteMul(number){
    var sum = 1;
    for( var i = 1; i <= number; i++ ){
        sum *= i;
    }

    return sum;
}

// function handleFirstRequest(req, res){
    // get counter value using query 
    // var counter = req.query.counter;

    // get counter vaue using headers 
    // console.log( req.headers);

    // get counter value using body 
    // console.log(req.body);
    // var counter = req.body.counter;
    

    // if client side error that it will show you 400 to 499 
//     if( counter < 1000000 ){
//         var calculatedSum = calcuteSum(counter);
//         var ans = 'total sum is ' + calculatedSum;
//         res.send(ans);    
//     }
//     else{
//         res.status(411).send("You have put very long number");
//     }
    
// }


// if want to return json file 
function handleFirstRequest(req, res ){
    var counter = req.body.counter;

    var calculatedSum = calcuteSum(counter);
    var calculatedMul = calcuteMul(counter);

    var answerObject = {
        sum: calculatedSum,
        mul: calculatedMul
    }

    res.status(200).send(answerObject);
}

function handleSecondRequest(req, res){

    res.send("I am Aman Pachauria");
}



// send Html data 
function givePage( req, res){

    // There are the two way to send a file 

    // res.send(`<head>
    //                 <title>
    //                     Hello I am Aman Pachauria
    //                 </title>
    //             </head>
    //             <body>
    //                 <b>What do you want</b>
    //             </body>`);

    res.sendFile(__dirname + "/index.html");
}

app.get('/', givePage );

app.get('/sum', handleFirstRequest);
// app.post('/creatUser', handleSecondRequest);
// app.put('/creatUser1', handleSecondRequest);
// app.delete('/deletecreatUser', handleSecondRequest);

function started(){
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started);

