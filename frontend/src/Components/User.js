import React, { useState, useEffect } from 'react';
import './User.css';

function Home() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getUsersData')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setUsers(res)
    })
  }, [])

  const userClickHandler = (name) => {
    window.location.href = "/" + name
  }

  return (
    <>
      <div className='user-title'>
        Select user from here
      </div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <button onClick={() => userClickHandler(user.name)} className="user-button">{user.name}</button>
          </div>
        )
      })}
    </>
  )
}

export default Home;