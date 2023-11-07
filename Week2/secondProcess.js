
// function callbacFn(result){

//     // status code fetching
//     console.log(result.status);
// }

function logResponseBody(jsonBody){
    console.log(jsonBody);
}

function callbacFn(result) {
    result.json().then(logResponseBody);
}

var sendObj = {
    method: "GET"
}

fetch("http://localhost:3000/handleSum?counter=10", sendObj).then(callbacFn);