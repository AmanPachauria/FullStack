import { Children, Component, useState } from 'react'
import './App.css'

function App() {

  const [ todo, settodo ] = useState({
    title: "gym ",
    discription: "go to gym from 5 to 8 ",
    id: 1
  });

  setInterval(() => {
    settodo({
      title: "gym ",
      discription: "go to gym from 5 to 2 ",
      id: 10
    })
  }, 2000);

  return (
    <>
      <h1>hi there</h1>
      {todo.title}
      {todo.discription}
      {todo.id}
      
      {/* here this line is rendring PersonName component  */}
      <PersonName firstNmae={todo.title} lastName={todo.discription}></PersonName>
    </>
  )
}

// props is use for passing the data from parent Children Element to parent Element 
// this is a Component 
function PersonName(props){
  return <div>
   {props.firstNmae} {props.lastName}
  </div>
}

export default App
