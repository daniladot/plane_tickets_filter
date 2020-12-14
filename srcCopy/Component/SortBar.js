import React from 'react'
import './SortBar.css'

export default function SortBar(props) {

       return (
        <div className="container">
            <div className="container_sort">
                <div className="sort_sign">
                    <h3>Сортировать</h3>
                    <div className="radio_button"><input type="radio" checked={props.sortPriceUp} onClick={() => props.setSortPriceUp(!props.sortPriceUp)} /><span> - По возрастанию цены</span></div>
                    <div className="radio_button"><input type="radio" checked={props.sortPriceDown} onClick={() => props.setSortPriceDown(!props.sortPriceDown)}/><span> - По убыванию цены</span></div>
                    <div className="radio_button"><input type="radio" checked={props.sortTime} onClick={() => props.setSortTime(!props.sortTime)} /><span> - По времени в пути</span></div>
                </div>
                <div className="sort_filter">
                    <h3>Фильтровать</h3>
                    <div className="radio_button"><input type="radio" checked={props.sortTransfer} onClick={()=> props.setSortTransfer(!props.sortTransfer)}/><span> - 1 пересадка</span></div>
                    <div className="radio_button"><input type="radio" checked={props.sortNotTransfer} onClick={()=> props.setSortNotTransfer(!props.sortNotTransfer)}/><span> - без пересадок</span></div>
                </div>
                <div className="sort_price">
                <h3>Цена</h3>
                    <div className="price_input"><span>От </span><input type="text" value={props.filterPriceFrom} onChange={(e) => props.setFilterPriceFrom(e.target.value)}/></div>
                    <div className="price_input"><span>До </span><input type="text" value={props.filterPriceBefore} onChange={(e) => props.setFilterPriceBefore(e.target.value)}/></div>
                </div>
                <div className="sort_company">
                <h3>Авиокомпании</h3>
                    {
                        props.carrierData.map(elem => {
                          return  <div className="radio_button"><input type="radio" value="check" checked={false} /><span> - {elem}</span></div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
