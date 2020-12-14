import React from 'react'
import FlightSegment from './FlightSegment'
import './FlightComponent.css'

export default function FlightComponent(props) {

    // console.log('rrr')
    //  console.log(props.elem.flight.legs)
    return (
        <div className="container_flight">
            <div className="title_bar">
                <img className="title_logo" src=""/>
                <div className="title_right">
                    <div className="title_price">{props.elem.flight.price.total.amount} Р</div>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            {props.elem.flight.legs.map((elem, index) =>
                <FlightSegment key={index} elem={elem} index={index} />
            )}

            <div className="change_btn">ВЫБРАТЬ</div>
        </div>
    )
}
