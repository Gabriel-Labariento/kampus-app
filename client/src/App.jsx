import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import SellForm from './components/SellForm'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-50 text-gray-900'>
        <nav className='bg-white border-b p-4 flex justify-between items-center shadow-sm sticky top-0 z-10'>
          <Link to="/" className='text-2xl font-bold text-blue-600'>Kampus</Link>
          <Link to="/sell" className='bg-black text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800'>Sell Item</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sell" element={
            <div className='p-8 flex justify-center'>
              <SellForm></SellForm>
            </div>
          }></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
