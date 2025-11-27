const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

//middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));
// app.use(cookieParser())


const userRoutes = require('./src/users/user.routes.js')
app.use('/api/auth',userRoutes)

const productRoutes = require('./src/products/product.routes.js')
app.use('/api/products',productRoutes)


const reviewRoutes = require('./src/reviews/review.route.js')
app.use('/api/reviews',reviewRoutes)

const orderRoutes = require("./src/orders/order.route.js")
app.use("/api/orders",orderRoutes)

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


