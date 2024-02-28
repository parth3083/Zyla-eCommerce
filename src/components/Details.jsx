import React, { useEffect, useState,useContext } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import Loading from './Loading'

import { ProductContext } from '../utils/Context';
function Details() {
  const navigate = useNavigate();
  const {products, setProducts} =useContext(ProductContext)
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0])
    }
  }, []);
  const DeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id)
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts))
    navigate('/')
  }
  return ( product ? (
    <div className='w-[70%] h-screen m-auto  flex items-center justify-center'>
      {/* Container  */}
      <div className='w-[80%] h-[80vh] bg-zinc-100 p-3 rounded-xl flex gap-4 overflow-hidden'>
        {/* image-container  */}
        <div className='w-[47%] h-[100%] overflow-hidden p-2'>
          <img src={`${product.image}`} className='w-full h-full object-contain rounded-2xl' alt="" />
        </div>
        {/* content  */}
        <div className='w-[53%] h-full '>
          <h1 className='text-4xl mt-20 font-semibold'>{product.title}</h1>
          <h3 className='text-zinc-400 mt-4'>{product.category}</h3>
          <h3 className='mt-4 text-3xl font-bold'>₹{product.price}</h3>
          <p className='mt-4 text-md mb-5'>{product.description}</p>
          <Link to={`/edit/${product.id}`} className='mt-2 border px-2 mr-3 rounded-md text-blue-500 py-1 text-lg border-blue-500'>Edit</Link>
          <button onClick={()=>DeleteHandler(product.id)} className='mt-2 border px-2  rounded-md text-red-500 py-1 text-lg border-red-500'>Delete</button>

        </div>
      </div>

    </div>
  ):(<Loading/>)
  )
}

export default Details