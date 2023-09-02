import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/home'
import Product from './components/product'
import Login from './components/login'
import Register from './components/register'
import ProductDetail from './components/ProductDetail'
import Profile from './components/profile'
import LoyalRegister from './components/LoyalRegister'
import ContactUs from './components/Test.js'
import AdminPage from './components/admin/Admin'
import PartnerInterface from './components/partner/PartnerInterface'


export default function RouteMap(){
    return(
        

            <Routes>
                <Route  path='/' exact element ={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/product/:Id' element={<ProductDetail/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/loyalregister' element={<LoyalRegister/>}/>
                <Route path='/testing' element={<ContactUs/>}/>
                <Route path='/admin/*' element={<AdminPage/>}/>
                <Route path='/interface' element={<PartnerInterface/>}/>

                
               

            </Routes>
       
       

       
    )
}