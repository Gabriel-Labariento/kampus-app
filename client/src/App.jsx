import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import SellForm from './components/SellForm'
import MyListings from './pages/MyListings'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-50 text-gray-900'>
        <nav className='bg-white border-b p-4 flex justify-between items-center shadow-sm sticky top-0 z-10'>
          <Link to="/" className='text-2xl font-bold text-blue-600'>Kampus</Link>

          {/* Show sign in action if the user is signed out*/}
          <div className='flex items-center gap-4'>
            <SignedOut>
              <SignInButton mode='modal'>
                <button className='text-gray-600 hover:text-black font-medium'>
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
        
          {/* Show sell page if the user is signed in */}
          <SignedIn>
            <Link to="/sell" className='bg-black text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800'>Sell Item</Link>
            <Link to="/my-listings" className='text-gray-600 hover:text-blue-600 font-mediuim ml-4'>My Items</Link>
            <UserButton></UserButton>
          </SignedIn>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sell" element={
            <div className='p-8 flex justify-center'>
              <SellForm></SellForm>
            </div>
          }></Route>
          <Route path='/my-listings' element={<MyListings />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
