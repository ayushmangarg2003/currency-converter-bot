const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/', async(req, res) => {
    const params = req.body.queryResult.parameters
    const source_currency = params['unit-currency'].currency
    const source_amount = params['unit-currency'].amount
    const target_currency = params['currency-name']
    
    const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {
            from: source_currency,
            to: target_currency,
            q: '1.0',
        },
        headers: {
            'X-RapidAPI-Key': 'a79e6a9bd3msh3edbfd409b2e9b5p1d8b23jsn5d462ac68ef7',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };
    const target_object = await axios.request(options);
    const target_amount = ((target_object.data)*source_amount).toFixed(2)
    const response = {
        'fulfillmentText':`${source_amount} ${source_currency} is ${target_amount} ${target_currency}`
    }
    res.json(response)
})

app.listen(3000, () => {
    console.log("Listening On Port 3000")
})

