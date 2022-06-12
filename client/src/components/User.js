import React from 'react'

function User({user}) {
    
  return (
    <div className="user">
        <h2>Name:- {user.name}</h2>
        <h2>Email:- {user.email}</h2>
    </div>
  )
}

export default User