import React from 'react'
import "../stylesheets/Error.css"

function Error({message}) {
  return (
    <div className="container">{message}</div>
  )
}

export default Error