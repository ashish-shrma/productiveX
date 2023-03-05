'use client'
import addData from "@/firebase/firestore/addData";
import { useFormik } from "formik";

export default function Companies() {

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      logo: '', 
      phone: '' ,
    },
    onSubmit: async () => {
      const { result, error } = await addData('providers', values.name, values)
      console.log(result, error)

    },
  });

  const {name, logo, phone} = values
  
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
          className ="border-2 border-black shadow rounded-lg my-2 h-10 p-1 text-black"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
