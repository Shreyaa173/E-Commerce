import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Collection from './components/Collection'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import Login from './components/Login'
import PlaceOrder from './components/PlaceOrder'
import Product from './components/Product'
import Orders from './components/Orders'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/collection' element={<Collection/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/order' element={<Orders/>}></Route>
          <Route path='/placeorder' element={<PlaceOrder/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
        </Routes>
    </div>
  )
}

export default App