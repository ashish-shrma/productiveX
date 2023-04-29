'use client'
import addData from '@/firebase/firestore/addData'
import { useFormik } from 'formik'
import { PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

import CustomInput from '@/components/form/CustomInput'

export default function Companies() {
  const [navigatorAvailable, setNavigatorAvailable] = useState(false)
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      logo: null,
      phone: '',
    },
    onSubmit: async (values) => {
      // encode values.logo to base64
      // add to firestore
      await addData('companies', values.name + values.phone, values)
    },
  })
  useEffect(() => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      setNavigatorAvailable(true)
    }
  }, [])
  const getPhoneNumber = async (e: any) => {
    if (!navigatorAvailable) return
    //check if android mobile
    if (
      !navigator.userAgent.includes('Android') &&
      !navigator.userAgent.includes('Mobile')
    )
      return
    const supportedProperties = await navigator.contacts.getProperties()
    if (supportedProperties.includes('tel')) {
      const contact = await navigator.contacts?.select(['tel'], {
        multiple: false,
      })
      if (contact.length > 0) {
        const phone = contact[0].tel[0].value
        setFieldValue('phone', phone)
      }
    }
  }

  const imageToBase64 = async (file: File) => {
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
    })
    setFieldValue('logo', base64)
  }
  const { name, logo, phone } = values

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Add a new company</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between">
          <CustomInput 
            label="Company name"
            type="text"
            onChange={handleChange}
            value={name}
            name="name"
            />

          <div className="relative my-2">
            <input
              type="tel"
              minLength={10}
              maxLength={10}
              onChange={handleChange}
              value={phone}
              name="phone"
              id="phone_outlined"
              className="block border-2 border-black shadow px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            {navigatorAvailable && (
              <UserGroupIcon
                onClick={getPhoneNumber}
                className="w-8 h-8 cursor-pointer absolute text-gray-500 top-1/2 transform -translate-y-1/2 right-3"
              />
            )}
            <label
              htmlFor="phone_outlined"
              className="absolute bg-gray-100 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Phone Number
            </label>
          </div>

          <div className="flex items-center justify-center w-full">
            <p className="text-sm">Logo:</p>
            <label htmlFor="imageUpload" className="relative cursor-pointer">
              <div className="flex items-center justify-center h-24 w-24 bg-gray-100 rounded-lg">
                {logo ? (
                  <img
                    src={logo}
                    alt="Uploaded image"
                    className="h-full w-full object-cover ml-2 rounded-lg"
                  />
                ) : (
                  <PlusCircleIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <input
                id="imageUpload"
                type="file"
                name="logo"
                className="sr-only"
                onChange={(event: any) => {
                  imageToBase64(event.currentTarget.files[0])
                }}
                accept="image/*"
              />
            </label>
          </div>
          {navigatorAvailable && (
            <p className="text-sm text-gray-500">
              Click on the icon to get phone number from contacts
            </p>
          )}
          <button
            type="submit"
            className="border-2 border-black bg-blue-500 shadow rounded-lg my-2 h-10 p-1 text-yellow-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
