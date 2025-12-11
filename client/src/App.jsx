import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import SellForm from './components/SellForm'
import MyListings from './pages/MyListings'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import ListingDetails from './pages/ListingDetails'
import {Toaster} from 'react-hot-toast'
import StudentRoute from './components/StudentRoute'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
    <Toaster position='bottom-center'></Toaster>
      <div className='min-h-screen bg-gray-50 text-gray-900'>
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
        
        {/* A. The Circular Icon */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300">
              <img 
                  src={"/public/Kampus Logo.svg"} 
                  alt="Kampus Logo" 
                  className="w-full h-full object-cover" 
              />
          </div>

          {/* B. The Text (Styled with CSS, not an image) */}
          <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">
                  Kampus
                  <span className="text-cyan-700">.</span>
              </span>
              <span className="text-[10px] font-medium text-gray-500 tracking-wider uppercase">
                  Student Market
              </span>
          </div>
      </Link>

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
            <StudentRoute className='p-8 flex justify-center'>
              <SellForm></SellForm>
            </StudentRoute>
          }></Route>
          <Route path='/my-listings' element={<StudentRoute><MyListings /></StudentRoute>}></Route>
          <Route path='/listing/:itemId' element={<ListingDetails />}></Route>
        </Routes>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  )
}

export default App
