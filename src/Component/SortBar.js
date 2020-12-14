import React,{useState} from 'react'
import './SortBar.css'

export default function SortBar(props) {

    const[firstPrice, setFirstPrice] = useState(0)

    const[secondPrice, setSecondPrice] = useState(0)

    function calculatefirstPrice(e){
        props.pricesSort(e.target.id, e.target.value)
        setFirstPrice(e.target.value)
        setSecondPrice(e.target.value)
    }

    function calculatePrice(e){
        
        if(e.target.value < firstPrice)
        {
            setSecondPrice(firstPrice);
        }   
        else
        {
            setSecondPrice(e.target.value)
            props.pricesSort(e.target.id, e.target.value)
        }
    }

       return (
        <div className="container">
            <div className="container_sort">
                <div className="sort_sign">
                    <h3>Сортировать</h3>
                    <div className="radio_button"><input type="radio" defaultChecked={true} name="prices" onChange={ () => props.filterSort('asc') }/><span> - По возрастанию цены</span></div>
                    <div className="radio_button"><input type="radio" name="prices" onChange={ () => props.filterSort('desc') } /><span> - По убыванию цены</span></div>
                    <div className="radio_button"><input type="radio" name="prices" onChange={ () => props.filterSort('time') } /><span> - По времени в пути</span></div>
                </div>
                <div className="sort_filter">
                    <h3>Фильтровать</h3>
                    <div className="radio_button"><input id="one" type="checkbox" name="filter" onChange={(e)=> props.transferSort(e.target.id, e.target.checked)}/><span> - 1 пересадка</span></div>
                    <div className="radio_button"><input id="none" type="checkbox" name="filter" onChange={(e)=> props.transferSort(e.target.id, e.target.checked)}/><span> - без пересадок</span></div>
                </div>
                <div className="sort_price">
                <h3>Цена</h3>
                    <div className="price_input"><span>От </span><input type="number" id="from" onInput={(e) => props.pricesSort(e.target.id, e.target.value)}/></div>
                    <div className="price_input"><span>До </span><input type="number" id="to"  onInput={(e) => props.pricesSort(e.target.id, e.target.value)}/></div>
                </div>
                <div className="sort_company">
                <h3>Авиокомпании</h3>
                    {props.airlines.map((elem,index) => (
                        <div key={index} className="radio_button"><input type="checkbox" value="check" onChange={(e) => props.airlinesSort(e.target.checked, elem.carrier)} /><span> {elem.carrier.slice(0,10)} - {elem.price} </span></div>
                    ))}        
                    
                </div>
            </div>
        </div>
    )
}
