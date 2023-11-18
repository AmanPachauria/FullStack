// using jwt i can encrypt a string and decrypt 

const jwt = require('jsonwebtoken');

// console.log(jwt);

const secret = "supersecret3";

const a = jwt.sign({
    User: "Aman Pachauria",
    Password: "123455"
}, secret);

console.log(a);

jwt.verify(a, secret, (err, orignalString) => {
    console.log(orignalString);
})