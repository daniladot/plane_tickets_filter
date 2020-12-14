import React from 'react'

export default function FlightSegment(props) {

    function getDate(date){
        date = date.split('T')[0].split('-')
        let year = date[0]
        let month = date[1]-1
        let day = date[2]

        const days =['вс','пн','вт','ср','чт','пт','сб']
        const months =['янв.','февр.','март','апр.','май','июнь','июль','авг.','сент.','окт.','нояб.','дек.']
        
        date = new Date(year, month, day)
       
        return `${date.getDate()} ${months[date.getMonth()]} ${days[date.getDay()]}`
    }


    return (
        <>
            <div className="name_bar">
                <span>{(props.elem.segments[0].departureCity != undefined) ? props.elem.segments[0].departureCity.caption : null},</span>
                <span> {props.elem.segments[0].departureAirport.caption}</span>
                <span className="abbreviations_airport"> ({props.elem.segments[0].departureAirport.uid})</span>
                <span className="arrow">→</span>
                <span>{(props.elem.segments[props.elem.segments.length - 1].arrivalCity != undefined) ? props.elem.segments[props.elem.segments.length - 1].arrivalCity.caption : null},</span>
                <span> {props.elem.segments[props.elem.segments.length - 1].arrivalAirport.caption}</span>
                <span className="abbreviations_airport"> ({props.elem.segments[props.elem.segments.length - 1].arrivalAirport.uid})</span>
            </div>
            <hr className="separate_line"></hr>
            <div className="time">
                <div className="departure">
                    <span className="time_departure"> {props.elem.segments[0].departureDate.split('T')[1].split(':').splice(0, 2).join(':')} </span>
                    <span className="date_departure">{getDate(props.elem.segments[0].departureDate)}</span>
                </div>

                <div>
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                        <span className="time_air"> {Math.floor(props.elem.duration/60)}ч {props.elem.duration%60} мин</span> 
                </div>

                <div className="arrival">
                    <span className="date_arrival">{getDate(props.elem.segments[props.elem.segments.length - 1].departureDate)}</span>
                    <span className="time_arrival"> {props.elem.segments[props.elem.segments.length - 1].departureDate.split('T')[1].split(':').splice(0, 2).join(':')}</span>
                </div>
            </div>
            <div className="horizont_line">
                {(props.elem.segments.length == 1) ?
                    <hr className="separate_line_full" style={{ width: 575 }} /> :
                    <>
                        <hr />
                        <span className="number_transfer"> {props.elem.segments.length - 1} пересадка </span>
                        <hr />
                    </>
                }
            </div>
            <span className="carrier">Рейс выполняет: {props.elem.segments[0].airline.caption}</span>
            {
                (props.index == 0) ?
                    <hr className="separate_line__blue"></hr> :
                    null
            }

        </>
    )
}
