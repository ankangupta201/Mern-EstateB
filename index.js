const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.URL).then(()=>{
  console.log("connected to mongodb")
}).catch((err)=>{
  console.log(err)
})

const app = express()

app.get('/', (req, res) => {
  res.send('Successful Response');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`)
})
