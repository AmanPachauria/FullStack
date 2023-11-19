function callback(res){
    console.log(res);
}

function getFromGoogle(){
    fetch("https://google.com").then(callback);
}

getFromGoogle();


// now using async and await 

async function getFromGoogleUsingAsync(){
    const res = await fetch("https://google.com")
    console.log(res);
}

getFromGoogleUsingAsync();