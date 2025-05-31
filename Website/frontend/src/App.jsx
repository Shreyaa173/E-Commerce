import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import DeliveryPolicy from './pages/DeliveryPolicy'
import UserPolicy from './pages/UserPolicy'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Orders from './pages/Orders'
import ForgotPassword from './pages/ForgotPassword'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify'
import Register from './pages/Register'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/order' element={<Orders/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/delivery-policy' element={<DeliveryPolicy/>} />
        <Route path='/privacy-policy' element={<UserPolicy/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/related-product/:productId' element={<Product/>} />
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App