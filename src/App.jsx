import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Header from './Components/Header'
import About from './Components/About';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Cart from './Components/Cart';
import ProtectedRoute from './Components/ProtectedRoute'
import Products from './Components/Products';
import useDarkMode from './Hooks/useDarkMode';
import Details from './Components/Details';
import Address from './Components/Address';
import Payment from './Components/Payment';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
          <Route path="/lg" element={<Login />} />
          <Route path="/rg" element={<SignUp />} />
          <Route path="/address" element={<Address />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
