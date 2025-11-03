const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')

//middleware
app.use(express.json())
app.use(cors())


//mongoose connect with mongodb

const uri = process.env.DB_URL
async function main() {
  await mongoose.connect(uri);
}

main().then(() => console.log("Mongodb connected successfully")).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


