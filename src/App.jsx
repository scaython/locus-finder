import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import './App.scss';

function App() {
  const API_KEY = 'at_UuS7hIHaohlkBfCU0QXsU4HVJB0uo';
  const [positions, setPositions] = useState([0, 0]);
  const [ip, setIP] = useState('');
  const inputRef = useRef();
  

  const getIP = async () => {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
    );
    const { lat, lng } = response.data.location;
    
    setPositions([lat, lng]);
  };

  const searchLocation = () => {
    const searchValue= inputRef.current.value
    setIP(searchValue)
  };

 

  useEffect(() => {
    getIP();
  }, [ip]);

  if (positions.length === 0) {
    return null; // or return a loading indicator while waiting for the coordinates
  }

  return (
    <>
      <div className="app-container">
       
        <div className="nav">
        <h1>Find IP location</h1>
        
          <div className="input-group">
            <input type="text" ref={inputRef} placeholder='IP Adress...'/>
            <button onClick={searchLocation}> Search </button>
          </div>
        
        </div>
    
        <div className="map-section">
          <MapContainer center={positions} zoom={1} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={positions}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default App;