import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup.jsx"
import Signin from "./Signin.jsx"
import Appbar from "./Appbar.jsx"


function App() {

  return (
    <>
    <div style={{
      // width: "100vw",
      // height: "100vw",
      backgroundColor: "#eeeeee",
    }}> 
       <Appbar/>
       {/* 1 Router make sure we are using router to navigate within our react app 
       2 Routes it's map all the Route and check which route should render when routes are match  */}
       <Router>
          <Routes>
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/signin"} element={<Signin />} />
          </Routes>
       </Router>
    </div>
      
    </>
  )
}

export default App
