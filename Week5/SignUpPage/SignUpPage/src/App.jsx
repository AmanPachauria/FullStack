import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Signup.jsx"
import Signin from "./Signin.jsx"
import Appbar from "./Appbar.jsx"


function App() {

  return (
    <>
    <div style={{
      width: "100vw",
      height: "100vw",
      backgroundColor: "#eeeeee",
    }}> 
       <Appbar/>
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
