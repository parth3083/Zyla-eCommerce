import { useState } from 'react'
import Home from './components/Home'
import Create from './components/Create'
import Details from './components/Details'
import Edit from './components/Edit'
import {Routes, Route,Link,useLocation } from 'react-router-dom'

function App() {
  const {search,pathname } = useLocation();
  return (
    <div className='w-full h-screen bg-white flex'>
      {(pathname !='/' || search.length>0) && (      <Link to='/' className='text-red-600 text-2xl absolute left-[22%]'>
        Home
      </Link>)}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
  )
}

export default App
