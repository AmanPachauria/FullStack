import React,{ useState } from 'react'
import './App.css'



// // app is called recursively again and again 
function App() {

// // Hook rendring 

//   // when we are rendring this todos will update only first render otherwise it will not update  
//   const [ todos, setTodos ] = React.useState(
//   {
//     title: "gym ",
//     discription: "go to gym from 5 to 8 ",
//     id: 1
//   });

// const [counter, setCounter] = React.useState(math.radom());
  
//   console.log('render')
//   setInterval(() => {
//     setTodos({
//       title: "gym ",
//       discription: "go to gym from 5 to 2 " + Math.random(),
//       id: 10
//     })
//   }, 2000);

//   return (
//     <>
//       <h1>hi there</h1>
//       {todos.title}
//       {todos.discription}
//       {todos.id}

      
//       {/* {todos.map((todo) => {
//          return <PersonName title={todo.title} discription={todo.discription}></PersonName>
//       })} */}


//       {/* here this line is rendring PersonName component  */}
//       <PersonName title = {todos.title} discription = {todos.discription}></PersonName>
//     </>
//   )
// }

// // props is use for passing the data from parent Children Element to parent Element 
// // this is a Component 
// function PersonName(props){
//   return <div>
//      {props.title}
//      <br />
//      {props.discription}
//   </div>


// another type of hook 

const [todosForToday, setTodos] = React.useState({
  title : " go to gym ",
  description : " go to gym from 5 to 7 ",
  id : 1
});

React.useEffect(() => {
  setInterval(() => {
      setTodos({
        title : " go to gym " + Math.random(),
        description : " go to gym from 5 to 7 ",
        id : 2
      })
  }, 1000)
}, [])
 return (
  <div>
    {todosForToday.title}
    <br />
    {todosForToday.description}
  </div>
 )
}
export default App
