import React from 'react';
import './ImageURLInput.css'

const ImageURLInput = (props) => {
    return (
        <div className='imageUrlInput center'>
            <div className='white f3 ma3-l'>
                This Magic Brain will detect faces in your pictures. Give it a try
            </div>
           <div className='inputs shadow-1 pa4 pb1 w-40 center'>
           <div >
                <input className='w-80 pa2' type='text' placeholder='Paste .jpg Image URL Here' onChange={props.onInputChange} />
                <button className='w-20 pa2 bg-red pointer dim grow' type='submit' onClick={props.onInputSubmit} >Detect</button>
                <p>Copy this example URL : https://clicklovegrow.com/wp-content/uploads/2019/08/7-2.jpg</p>
            </div>
            <p className='black-60 b'></p>
           </div>
        </div>
    )
}

export default ImageURLInput