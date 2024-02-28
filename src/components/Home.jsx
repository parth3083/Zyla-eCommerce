import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link ,useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from 'axios'

function Home() {
  const { products } = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  console.log(category);
  const getProductsCategory = async ()=>{
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!filteredProducts || category=='undefined') {
      setFilteredProducts(products)
    }
    if (category != 'undefined') {
      // getProductsCategory();
      setFilteredProducts(products.filter((p)=>p.category==category))
    }
  },[category,products])
  return (
    products ? (
      <>
          <Nav/>
        <div className='w-[80%] h-screen  p-10 flex flex-wrap gap-4 gap-col-2 overflow-x-hidden overflow-y-auto'>
        {/* Card  */}
          { filteredProducts && filteredProducts.map((p, i) => {
         
          return <Link key={i} to={`/details/${p.id}`} className='w-[23%] h-[45vh] bg-purple-200 shadow rounded-md p-3 flex flex-col items-center justify-center'>
          {/* image div  */}
            <div className='w-full h-[90%] hover:scale-105 transition-all bg-center bg-no-repeat bg-cover rounded-md overflow-hidden '>
              <img src={p.image} key={i} className='w-full h-full object-contain ' alt="" />

          </div>
          <h1 className='text-xl mt-2 hover:text-blue-600 cursor-pointer'>{p.title}</h1>
        </Link>
        })}     
      </div>
      </>):(<Loading/>)
  )
}

export default Home