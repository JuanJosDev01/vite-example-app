import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'


export const Map = ({ position, zoom = 13 }) => {
  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      scrollWheelZoom={false}
      style={{
        width: 800,
        height: 400
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          un hongo encontrado aquí
        </Popup>
      </Marker>
    </MapContainer>
  )
}