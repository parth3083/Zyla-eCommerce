import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function Create() {
    const navigate=useNavigate()
    const {products, setProducts} =useContext(ProductContext)
    const [title, setTitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const AddProductHandler = (e) => {
        e.preventDefault();
        const product = {
            id:nanoid(),
            title,
            image,
            category,
            price,
            description
        }   
        setProducts([...products, product]);
        localStorage.setItem("products",
            JSON.stringify([...products, product]))
        toast.success("Product added successfully")
        navigate('/')
    }
  return (
      <form onSubmit={AddProductHandler} className='p-[5%] w-screen h-screen flex flex-col '>
          <h1 className='text-3xl mb-3'>Add Items</h1>
          <input type="text"
              placeholder='title'
              className='text-md bg-zinc-100 rounded p-3 w-1/2 mb-3'
              onChange={(e) => setTitle(e.target.value)}
          value={title}
          required/>
          <input type="url"
              placeholder='image link'
              className='text-md bg-zinc-100 rounded p-3 w-1/2 mb-3'
              onChange={(e) => setimage(e.target.value)}
              value={image}
              required />
          <div className='flex gap-3 w-1/2'>
          <input type="text"
              placeholder='category'
              className='text-md bg-zinc-100 rounded p-3 w-[48%] mb-3'
              onChange={(e) => setcategory(e.target.value)}
              value={category}
              required />
          
          <input type="number"
          placeholder='price'
          className='text-md bg-zinc-100 rounded p-3 w-[48%] mb-3'
          onChange={(e) => setprice(e.target.value)}
                  value={price}
                  required /></div>   
          <textarea
              onChange={(e) => setdescription(e.target.value)}
              className='text-md bg-zinc-100 rounded p-3 w-[48%] mb-3'
              placeholder='enter product description'
              value={description}
              required
              rows="10"></textarea>    
          <button  className='mt-2 w-[13%] border px-8 rounded-md text-blue-500 py-2 text-xl border-blue-500'> Add Product</button>
      </form>

  )
}

export default Create