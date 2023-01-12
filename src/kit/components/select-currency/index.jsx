import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import Container from '@mui/material/Container';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import getSymbolFromCurrency from "currency-symbol-map";


const BASE_URL = 'https://api.apilayer.com/fixer/latest'
const CONVERT_URL = (to, from, amount) => `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`

const API_KEY = 'KPCS1TDyl1Jl4X6fQ3lJILhAWmnCithL'

const REQUEST_HEADERS = {
   method: 'GET',
   headers: new Headers({
          apikey: API_KEY
       })
}

const Converter = () => {
   const [rates, setRates] = useState([])
   const [res, setRes] = useState({
      result: '',
      symbols: ''
   })
   const [fromRates, setFromRates] = useState(null)
   const [toRates, setToRates] = useState(null)

   const [input, setInput] = useState('')
   const handleInputChange = (event) => setInput(event.target.value)


   const handleChangeForm = (rates) => setFromRates(rates)
   const handleChangeFormTwo = (rates) => setToRates(rates)
   const handleChangeConvert = () => {
      setFromRates(toRates)
      setToRates(fromRates)
   }
   const handleClickConvert = async () => {
      try {
         const res = await fetch(CONVERT_URL(toRates.value, fromRates.value, input), REQUEST_HEADERS)
         const data = await res.json()
         setRes({
            result: Math.round(data.result),
            symbols: getSymbolFromCurrency(`${toRates.value}`)
         })

      } catch (e) {
         console.log(e, 'error')
      }
      console.log(res)

   }

   const fetchRates = async () => {
      try {
         const res = await fetch(BASE_URL, REQUEST_HEADERS)
         const data = await res.json()
         return data
      } catch (e) {
         console.log(e, 'error')
      }
   }

   useEffect(() => {
      (async () => {
         const data = await fetchRates()
         const rates = Object.keys(data.rates).map(item => ({
            label: item,
            value: item
         }))
         setRates(rates)
      })()
   }, [])
   return (
       <div>
          <Container sx={{display: 'block', textAlign: 'center', padding: '15px',}}>
             <Typography variant="h5" gutterBottom>
                Exchange Rate
             </Typography>
             <Typography variant="h5" gutterBottom>
                {`${res.result} ${res.symbols}`}
             </Typography>
             <TextField
                 value={input}
                 onChange={handleInputChange}
                 type={'number'}
                 sx={{width: '287px'}}
                 Amount label="Amount"
                 id="fullWidth"/>
          </Container>
          <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0 15px 0'}}>
             <Select
                 value={fromRates}
                 options={rates}
                 onChange={handleChangeForm}
                 placeholder={'From'}
             />
             <Button onClick={handleChangeConvert}>
                <SwapHorizIcon/>
             </Button>
             <Select
                 value={toRates}
                 options={rates}
                 onChange={handleChangeFormTwo}
                 placeholder={'To'}
             />
          </Container>
          <Container>
             <Button onClick={handleClickConvert} variant="outlined">CONVERT</Button>
          </Container>

       </div>
   );
};

export default Converter;