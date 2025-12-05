import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.text())
      .then(data => console.log(data))
  }, [])
  return (
    <>
    
    </>
  )
}

export default App
