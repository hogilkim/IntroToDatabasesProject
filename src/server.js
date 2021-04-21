const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (res, req)=>{
    res.setEncoding('Hello from express');
})

app.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`)
})