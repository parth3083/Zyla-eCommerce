import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid'
import {useNavigate,useParams} from 'react-router-dom'
function Edit() {
    const { id}=useParams();
    const navigate=useNavigate()
    const { products, setProducts } = useContext(ProductContext)
    const [product, setProduct] = useState({
        title:'',
        image:'',
        price:'',
        category:'',
        description:'',
    })
    const changeHandler = (e) => {
    setProduct({...product,[e.target.name]:e.target.value})
}
    const AddProductHandler = (e) => {
        e.preventDefault();
        const productIndex = products.findIndex((p) => p.id == id);

        const copyData = [...products];
        copyData[productIndex] ={...products[productIndex],...product}
        setProducts(copyData);
        localStorage.setItem("products",
        JSON.stringify(copyData))
        navigate(-1)
    }

    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0]);
    },[id])
  return (
    <form onSubmit={AddProductHandler} className='p-[5%] w-screen h-screen flex flex-col '>
    <h1 className='text-3xl mb-3'>Edit Items</h1>
    <input type="text"
        placeholder='title'
        className='text-md bg-zinc-100 rounded p-3 w-1/2 mb-3'
        name="title"
        onChange={changeHandler}
    value={product && product.title}
    required/>
    <input type="url"
        placeholder='image link'
        className='text-md bg-zinc-100 rounded p-3 w-1/2 mb-3'
        name="image"
        onChange={changeHandler}
        value={product && product.image}
        required />
    <div className='flex gap-3 w-1/2'>
    <input type="text"
        placeholder='category'
        className='text-md bg-zinc-100 rounded p-3 w-[48%] mb-3'
        name="category"
        onChange={changeHandler}
        value={product && product.category}
        required />
    
    <input type="number"
    placeholder='price'
    className='text-md bg-zinc-100 rounded p-3 w-[48%] mb-3'
    name="price"
    onChange={changeHandler}
            value={product && product.price}
            required /></div>   
    <textarea
        onChange={changeHandler}
        className='text-md bg-zinc-100 rounded p-3 w-[48%] mb-3'
        name="description"
        placeholder='enter product description'
        value={product && product.description}
        required
        rows="10"></textarea>    
    <button  className='mt-2 w-[13%] border px-8 rounded-md text-blue-500 py-2 text-xl border-blue-500'> Edit Product</button>
</form>

  )
}

export default Edit