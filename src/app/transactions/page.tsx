'use client'
import addData from "@/firebase/firestore/addData";
import { getCollection } from "@/firebase/firestore/getData";
import { DocumentData } from "@firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState<DocumentData[]| null>(null)
    const [vendors, setVendors] = useState<DocumentData[]| null>(null)

    useEffect(() => {
     getCollection('providers').then((data) => {
            setProducts(data.result)
      })
      getCollection('vendors').then((data) => {
        setVendors(data.result)
  })
    }, [])

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      productList: {},
      vendor: '',
    },
    onSubmit: async () => {
      const { result, error } = await addData('products', values.vendor, values)
      console.log(result, error)

    },
  });

  const { productList, vendor } = values
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="product" onChange={handleChange} id="products">
            {products && products.map((products) => (
                <option key={products.name} value={products.name}>{products.name}</option>    
            ))}
        </select>
        <select name="vendor" onChange={handleChange} id="products">
            {vendors && vendors.map((vendor) => (
                <option key={vendor.name} value={vendor.name}>{vendor.name}</option>    
            ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
