import React from 'react'
import FlightComponent from './FlightComponent'
import './MainComponent.css'

export default function MainComponent(props) {

    return (
        <div className="cont">
            {props.Data.map((elem, index) =>
                <FlightComponent key={index} elem={elem} />)}
        <div className="showMore_btn" onClick={() => props.addData()}>Показать ещё</div>
        </div>
    )
}
