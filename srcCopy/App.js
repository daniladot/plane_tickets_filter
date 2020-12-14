import './App.css';
import DataJson from './flights.json'
import SortBar from './Component/SortBar'
import MainComponent from './Component/MainComponent'
import {useState, useEffect} from 'react'

function App() {

  let [DataSort, setDataSort] = useState(JSON.parse(JSON.stringify(DataJson)))

  let[Data, setData] = useState([])

  let[countData, setCountData] = useState(0)

  let [carrierData, setCarrierData] = useState([])

  let[sortPriceUp, setSortPriceUp] = useState(false)

  let[sortPriceDown, setSortPriceDown] = useState(false)

  let[sortTime, setSortTime] = useState(false)

  let[sortTransfer, setSortTransfer] = useState(false)

  let[sortNotTransfer, setSortNotTransfer] = useState(false)

  let[filterData, setFilterData] = useState()

  let[filterPriceFrom, setFilterPriceFrom] = useState()
  
  let[filterPriceBefore, setFilterPriceBefore] = useState()


  function addData(){
    Data = []
    setData(Data)
    countData += 2
    setCountData(countData)
    for(let i = 0; i < countData; i++){
      if((sortPriceUp || sortPriceDown || sortTime) && ((sortNotTransfer == false) && (sortTransfer == false))){
        Data.push(DataSort.result.flights[i])
        console.log('bad')
        setData(Data)
      }else if(sortNotTransfer || sortTransfer){
        Data.push(filterData[i])
        console.log('filter data ')
        console.log(1)
        setData(Data)
      } else {
       Data.push(DataJson.result.flights[i])
       setData(Data)
      }
    }

  }

  function addCarrierData(){
    console.log(filterData)
    if(sortNotTransfer || sortTransfer){
      console.log('good')
      console.log(filterData)
      carrierData =[]
      setCarrierData(carrierData)

      filterData.forEach(element => {
        if(element.flight.legs[0].segments.length == 1){
          console.log('good1')
          if(!carrierData.includes(element.flight.carrier.caption))
             carrierData.push(element.flight.carrier.caption)
        } else{
          if(!carrierData.includes(element.flight.carrier.caption))
             carrierData.push(element.flight.carrier.caption)
        }     console.log('dddd')
        
      });
    } else {
      DataJson.result.flights.forEach(element => {
      if(carrierData.length == 1){
        carrierData.push(element.flight.carrier.caption)
      }else{
        if(!carrierData.includes(element.flight.carrier.caption))
           carrierData.push(element.flight.carrier.caption)
      }
    });

  }
  console.log(carrierData)
    setCarrierData(carrierData)
  }

  useEffect(() => {
    if(countData == 0){
      setCountData(2)
      addCarrierData()
      addData()
    }
  })

  useEffect(() => {
    if(sortPriceUp == true){
      setSortPriceDown(false)
      setSortTime(false)
    } else {
      countData = 0
      setCountData(countData)
      addData()
    }
    sortData()

  }, [sortPriceUp])

  useEffect(() => {
    if(sortPriceDown == true){
      setSortPriceUp(false)
      setSortTime(false)
    } else {
      countData = 0
      setCountData(countData)
      addData()
    }
    sortData()

  }, [sortPriceDown])
  
  useEffect(() => {
    if(sortTime == true){
      setSortPriceDown(false)
      setSortPriceUp(false)
    } else {
      countData = 0
      setCountData(countData)
      addData()
    }
    sortData()
  }, [sortTime])

  useEffect(() => {
    if(sortNotTransfer == true){
      setSortTransfer(false)
    } else {
      countData = 0
      setCountData(countData)
      addData()
    }
    sortData()
  }, [sortNotTransfer])

  useEffect(() => {
    if(sortTransfer == true){
      setSortNotTransfer(false)
    } else {
      countData = 0
      setCountData(countData)
      addData()
    }
    sortData()
  }, [sortTransfer])

  useEffect(() => {
    console.log(filterPriceFrom)
  }, [filterPriceFrom])

  function sortData(){
    if(sortPriceUp)
        DataSort.result.flights.sort((prev,next) => prev.flight.price.total.amount - next.flight.price.total.amount)
    else if(sortPriceDown)
        DataSort.result.flights.sort((prev,next) => next.flight.price.total.amount - prev.flight.price.total.amount)
    else if(sortTime)
        DataSort.result.flights.sort((prev,next) => prev.flight.legs[0].duration - next.flight.legs[0].duration)
 
    if(sortNotTransfer){
      if(sortPriceUp || sortPriceDown || sortTime){
        filterData = DataSort.result.flights.filter((item) => item.flight.legs[0].segments.length == 1)
      } else {
        filterData = DataJson.result.flights.filter((item) => item.flight.legs[0].segments.length == 1)
      }
      setFilterData(filterData)
    }else if(sortTransfer){
      if(sortPriceUp || sortPriceDown || sortTime){
        filterData = DataSort.result.flights.filter((item) => item.flight.legs[0].segments.length == 2)
      } else {
        filterData = DataJson.result.flights.filter((item) => item.flight.legs[0].segments.length == 2)
      }
      
      setFilterData(filterData)
    }

        countData = 0
    setCountData(countData)
    addCarrierData()
    addData()
  }

  return (
    <div className="App">
      <SortBar carrierData={carrierData} 
               sortPriceUp={sortPriceUp} 
               setSortPriceUp={setSortPriceUp}
               sortPriceDown = {sortPriceDown}
               setSortPriceDown= {setSortPriceDown}
               sortTime={sortTime}
               setSortTime={setSortTime}
               sortTransfer={sortTransfer}
               setSortTransfer={setSortTransfer}
               sortNotTransfer={sortNotTransfer}
               setSortNotTransfer={setSortNotTransfer}
               filterPriceFrom={filterPriceFrom}
               setFilterPriceFrom={setFilterPriceFrom}
               filterPriceBefore={filterPriceBefore}
               setFilterPriceBefore={setFilterPriceBefore}
               />
       <MainComponent addData={addData} DataJson={DataJson} Data={Data}/>
    </div>
  );
}

export default App;
