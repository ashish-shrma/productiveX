'use client'
import addData from "@/firebase/firestore/addData";
import { useFormik } from "formik";

export default function Companies() {

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      phone: '' ,
      location: '',
    },
    onSubmit: async () => {
      const { result, error } = await addData('vendors', values.name, values)
      console.log(result, error)

    },
  });

  const {name, location, phone} = values
  
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
          name="location"
          value={location}
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
