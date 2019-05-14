import React from 'react'

const LocationCard = location => {

    return (
        <div className="location-card">
            <p className="location-name">{location.name}</p>
            <p className="location-address">{location.address}</p>
            <img src={location.photo} alt={location.title}/>
        </div>
    )
}

export default LocationCard