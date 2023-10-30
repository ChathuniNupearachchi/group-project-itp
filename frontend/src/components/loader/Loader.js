import React from 'react'
import loaderImg from "../../assets/loader (1).gif"
import  ReactDOM  from 'react-dom'
import "./Loader.scss"

function Loader() {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            <img src='loaderImg' alt="Looding..."/>

         </div>
    </div>,
    document.getElementById("loader")
  )
}

export const SpinnerIMg = () =>{
    return (
        <div className="--center-all">
            <img src={loaderImg} alt="Looding..."/>
        </div>
    )
}

export default Loader
