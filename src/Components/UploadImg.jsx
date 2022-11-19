import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { storage } from '../firebase-config'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

function UploadImg() {
  const [imageUpload, setImageUpload] = useState(null)
  const { id } = useParams()

  const uploadImage = () => {
    if (imageUpload == null) return
    // location of image storage, to do: update path to stringified db name
    const imageRef = ref(
      storage,
      `${'images/' + id + '/' + imageUpload.name + v4()}`
    )
    uploadBytes(imageRef, imageUpload).then(() => {
      alert('Image Uploaded')
    })
    console.log(imageRef)
  }

  return (
    <>
      <div className="descriptioncard">
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0])
          }}
        />
        <button onClick={uploadImage}> Upload Image </button>
      </div>
    </>
  )
}

export default UploadImg
