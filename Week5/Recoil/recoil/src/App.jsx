import { useState } from 'react'
import './App.css'
import { Button, Card, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
         display: "flex",
         justifyContent: "center"
    }}>
      <Card style={{
          padding: 20,
          width: 500
      }} ></Card>
        
    </div>
  )
}

export default App
