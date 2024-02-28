import React ,{ useContext } from 'react'
import { ProductContext } from '../utils/Context'
import {Link } from 'react-router-dom'

function Nav() {
  const {products} = useContext(ProductContext);
  let distinctCtaegory = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinctCtaegory = [...new Set(distinctCtaegory)];
  return (
      <>
            <nav className='w-[20%] h-screen bg-zinc-200 flex flex-col items-center p-5'>
        <a href="/create" className='mt-2 border px-8 rounded-md text-blue-500 py-2 text-xl border-blue-500'> Add Item</a>
        <hr className='w-[90%] mt-3 bg-zinc-300 h-[2px]' />
        <h1 className='w-full  mt-3 text-2xl'>Category Filter</h1>
        <ul className=' w-full mt-2 flex flex-col gap-2'>
          {distinctCtaegory.map((p, i) => (
            <Link key={i} to={`/?category=${p}`} className=' flex items-center gap-2'> <span className='w-[15px] h-[15px] rounded-full bg-green-600 '>{" "}</span> <h5>{p}</h5></Link>
          ))}
        </ul>
      </nav></>
  )
}

export default Nav