import React from 'react'
import './Navigation.css'

const Navigation = (props) => {
  return (
    <nav className='nav'>
        <p className='f3 link dim black underline pa3 pointer' onClick={ () => props.onRouteChange('signin') } >Sing Out</p>
    </nav>
  )
}

export default Navigation