

function createDomElement(data){

    var parentElement = document.getElementById("mainArea");
    parentElement.innerHTML = "";
    for( var i = 0; i < data.length; i++ ){

        var childElement = document.createElement("div");

        var grandChileElement1 = document.createElement("span");
        grandChileElement1.innerHTML = data[i].title;

        var grandChileElement2 = document.createElement("span");
        grandChileElement2.innerHTML = data[i].description;

        var grandChileElement3 = document.createElement("button");
        grandChileElement3.innerHTML = "Delete";
        grandChileElement3.setAttribute("onclick", "deleteTodo(" + data[i].id + ")");

        childElement.appendChild(grandChileElement1);
        childElement.appendChild(grandChileElement2);
        childElement.appendChild(grandChileElement3);

        parentElement.appendChild(childElement);
    }
}

window.setInterval(() => {
    let todos = []
    for( var i = 0; i < Math.floor(Math.random()*100); i++ ){
        todos.push({
            title: "go to gym",
            description: "go to gym from 12pm",
            id: i+1
        })
    }
    
    createDomElement(todos);
}, 1000)