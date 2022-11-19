import '../App.css'
import React from 'react'
import { storage } from '../firebase-config'
import { listAll, ref, getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Images() {
  const { id } = useParams()
  const [imageFile, setImageFile] = useState([])

  const imageFileRef = ref(storage, `${'images/' + id}`)

  useEffect(() => {
    listAll(imageFileRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageFile((prev) => [...prev, url])
        })
      })
    })
  }, [])

  return (
    <>
      <div key={'imageslides'}>
        {imageFile.map((url) => {
          return <img src={url} alt="plant file" />
        })}
      </div>
    </>
  )
}

export default Images
