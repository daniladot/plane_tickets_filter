import './App.css';
import SortBar from './Component/SortBar'
import MainComponent from './Component/MainComponent'
import { useState, useEffect } from 'react'

const Filter = {
  sort: "asc",
  transfer: { one: false, none: false },
  prices: { from: 0, to: 0 },
  airlines: []
}

let dataCopy = []
function App() {

  const [status, setStatus] = useState(false)

  const [data, setData] = useState(null)

  const [airlines, setAirlines] = useState([])

 

  useEffect(() => {
    console.log(Filter)
  })

  useEffect(() => {
    fetch('/flights.json').then(
      (response) => response.json()
    ).then(
      (data) => {     

        dataCopy = [...data.result.flights];
        setData(data.result.flights)
        const air = []
        const airnames = []
        dataCopy.forEach((elem, index) => {
          if(!airnames.includes(elem.flight.carrier.caption)){
            airnames.push(elem.flight.carrier.caption)
            const airline = dataCopy.filter((item) => item.flight.carrier.caption == elem.flight.carrier.caption).sort((prev,next) => prev.flight.price.total.amount - next.flight.price.total.amount)
             air.push({carrier: elem.flight.carrier.caption, price: airline[0].flight.price.total.amount})
          }
        })
        setAirlines(air)
      })
  }, [status])

  //отладить

  function acceptParams(){
    let newData = [...dataCopy];
    if (newData) {
      if(Filter.sort == 'asc')
        newData = [...newData.sort((prev, next) => prev.flight.price.total.amount - next.flight.price.total.amount)]
      else if (Filter.sort == 'desc')
        newData = [...newData.sort((prev, next) => next.flight.price.total.amount - prev.flight.price.total.amount)]
      else 
        newData = [...newData.sort((prev,next) => prev.flight.legs[0].duration - next.flight.legs[0].duration)]

        if (Filter.transfer.one && !Filter.transfer.none){
        newData = newData.filter((elem) => elem.flight.legs[0].segments.length > 1)
      } else if (Filter.transfer.none && !Filter.transfer.one){
        newData = newData.filter((elem) => elem.flight.legs[0].segments.length < 2)
      }
  

      if(Filter.prices.from || Filter.prices.to){
         newData = newData.filter((elem) => elem.flight.price.total.amount >= +Filter.prices.from  && elem.flight.price.total.amount <= +Filter.prices.to
         )}
         console.log(newData)

         const air = []
         const airnames = []
         newData.forEach((elem, index) => {
           if(!airnames.includes(elem.flight.carrier.caption)){
             airnames.push(elem.flight.carrier.caption)
             const airline = dataCopy.filter((item) => item.flight.carrier.caption == elem.flight.carrier.caption).sort((prev,next) => prev.flight.price.total.amount - next.flight.price.total.amount)
              air.push({carrier: elem.flight.carrier.caption, price: airline[0].flight.price.total.amount})
           }
         })

        setAirlines(air)
        
         let FinishNewData = []
         if(Filter.airlines.length){
          Filter.airlines.forEach((elem) => {
            newData.forEach((item) => {
              if(item.flight.carrier.caption == elem){
                FinishNewData.push(item)
              }
            })
          })
         }
         console.log(FinishNewData)
         FinishNewData.length ? setData(FinishNewData) : setData(newData);
    }
  }

  //отладить

  function filterSort(param) {
    Filter.sort = param
    acceptParams()
    console.log(Filter)
  }


  function transferSort(key, param){
    console.log('flt')
    console.log(Filter)
    Filter.transfer[key] = param
    acceptParams()
    console.log(Filter)
  }

  function airlinesSort(checked, param){
    if(checked){
      Filter.airlines.push(param)
    } else {
      Filter.airlines.splice(Filter.airlines.indexOf(param),1)
    }
    acceptParams()
  }
  
  function pricesSort(key, param){
    Filter.prices[key] = param || "0"
    acceptParams()
  }

  return (
    <div className="App">
      <SortBar filterSort={filterSort} 
               transferSort={transferSort} 
               pricesSort={pricesSort}
               airlinesSort={airlinesSort} 
               airlines={airlines}
      />
      <MainComponent data={data} />
    </div>
  );
}

export default App;
