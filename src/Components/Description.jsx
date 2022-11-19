import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import UploadImg from './UploadImg'
import Images from './Images'
import Map from './Map'

function Description() {
  const { id } = useParams()
  const [plants, setPlants] = useState([])
  const plantsCollectionRef = collection(db, 'plantsdb')

  useEffect(() => {
    const getPlants = async () => {
      const data = await getDocs(plantsCollectionRef)
      setPlants(
        data.docs.map((doc) => ({ ...doc.data(), plantsdb: doc.plantsdb }))
      )
    }
    getPlants()
  }, [])

  const selectedPlant = plants.find((plant) => {
    // eslint-disable-next-line eqeqeq
    return plant.id == id
  })

  // place conditional rendering here for potential empty states in database store (e.g. no other names )

  return (
    <>
      <div className="descriptioncard" key={'description'}>
        <div>
          <Images />
          <h1> {selectedPlant?.name} </h1>
          <p>Also known as: {selectedPlant?.othernames}</p>
          <p> {selectedPlant?.description} </p>
          <button> Uses: {selectedPlant?.tags} </button>
          <p></p>
          <Map />
          <UploadImg />
        </div>
      </div>
    </>
  )
}

export default Description
