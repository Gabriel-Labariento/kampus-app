import { useEffect, useState } from 'react'
import SellForm from './components/SellForm'
import './App.css'

function App() {

  useEffect(() => {
    fetch('http://localhost:3333/')
      .then(res => res.text())
      .then(data => console.log(data))
  }, [])
  return (
    <>
    <SellForm></SellForm>
    </>
  )
}

export default App
