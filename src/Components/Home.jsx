import { useState, useEffect } from 'react'
import '../App.css'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function Home() {
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

  return (
    <section className="main">
      {
        <div className="card">
          {plants.map((plant) => (
            <div className="displaycard" key={plant.name}>
              <Link to={`/plants/${plant.id}`}>
                <h1> {plant.name} </h1>
              </Link>
              <p> Also known as: {plant.othernames}</p>
            </div>
          ))}
        </div>
      }
    </section>
  )
}

export default Home

// to do: photo display first image in DB, w click through functionality
