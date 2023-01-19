import React from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
    return (
        <div className='logo ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{ max : 55 }}>
                <div className='Tilt-inner pt3'>
                    <img src={brain} alt='Logo'></img>
                    <div className='b'>Face Recognition</div>
                    </div>
            </Tilt>
        </div>
    )
}

export default Logo