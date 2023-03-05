'use client'
import addData from "@/firebase/firestore/addData";
import { getCollection } from "@/firebase/firestore/getData";
import { DocumentData } from "@firebase/firestore";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export default function Products() {
    const [companies, setCompanies] = useState<DocumentData[]| null>(null)

    useEffect(() => {
     getCollection('providers').then((data) => {
            setCompanies(data.result)
      })
    }, [])

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      logo: '', 
      price: 0,
      cost: 0,
      company: '',
    },
    onSubmit: async () => {
      const { result, error } = await addData('products', values.name+values.company, values)
      console.log(result, error)

    },
  });

  const {name, logo, price, cost, company} = values
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="logo"
          value={logo}
          onChange={handleChange}
        />
        <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
        />
        <input
            type="number"
            name="cost"
            value={cost}
            onChange={handleChange}
        />
        <select name="company" onChange={handleChange} id="company">
            {companies && companies.map((company) => (
                <option key={company.name} value={company.name}>{company.name}</option>    
            ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
