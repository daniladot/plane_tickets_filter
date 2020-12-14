import {useState} from 'react'
import FlightSegment from './FlightSegment'
import './MainComponent.css'
import './FlightComponent.css'


export default function MainComponent(props) {
    console.log(props);

    const countLimit = 2

    const[limit,setLimit] = useState(2)

    function getList() {
        return props.data.map((elem, index)=> {
            if(index < limit)
            {
                return (
                    <div className="container_flight">
                          <div className="title_bar">
                            <img className="title_logo" src="" />
                            <div className="title_right">
                                <div className="title_price">{elem.flight.price.total.amount} Р</div>
                                <p>Стоимость для одного взрослого пассажира</p>
                            </div>
                        </div>
                        {
                            elem.flight.legs ?

                            elem.flight.legs.map((item, index) => (
                                <FlightSegment data={item} index={index} />
                            )) 

                            : null
                        }
                        <div className="change_btn">ВЫБРАТЬ</div>
                    </div>
                )
            }
           
        });    
    }

    return (
        props.data ?
            <div className="cont">
                { getList() }
                <div className="showMore_btn" onClick={() => setLimit(limit+countLimit)}>Показать ещё</div>
            </div>
            :
            <p>нет записи</p>
    )
}
