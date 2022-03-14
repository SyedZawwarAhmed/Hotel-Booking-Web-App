import React from 'react'

function Room({name, images, description, type}) {
  return (
      <div className="room">
        <img src={images[0]} alt="" />
        <h1>{name}</h1>
        <h3>{type}</h3>
        <p>{description}</p>
        <button>Book Now</button>
      </div>
  )
}

export default Room