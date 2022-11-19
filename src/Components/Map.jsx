import { useMemo, useState, useCallback, useRef, useEffect, React } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { db } from '../firebase-config'
import { useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'

/////////////////////////////////////

////////////////////////////////////

function Map() {
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState([])

  //////// bringing in the database ////////////

  const [plants, setPlants] = useState([])
  const plantsCollectionRef = collection(db, 'plantsdb')
  const { id } = useParams()

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

  ///////////////////////////////////////////////////

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
  }, [])

  // for searching the map
  const mapRef = useRef()
  // callback for when the map loads
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const center = useMemo(() => ({ lat: -44.9, lng: 169.233 }), [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>

  // sets the start location on the map

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'https://media0.giphy.com/media/xUPGcxGvIQNa2Xqdpu/giphy.gif',
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            //setting the active marker click state
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            anchor={new window.google.maps.Point(15, 15)}
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div className="infowindow"> {selectedPlant?.name} </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}

export default Map
