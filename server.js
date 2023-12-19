require('dotenv').config()
const cors=require('cors')
const express = require('express')
const mongoose = require('mongoose')
const placesRoutes=require('../Backend/routes/place')
const userRoutes=require('../Backend/routes/user')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors(
  {
      origin: ["https://deploy-mern-frontend.vercel.app"],
      methods: ["POST", "GET"],
      credentials: false
  }
));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/places', placesRoutes)
app.use('/api/user', userRoutes)



// connect to db
mongoose.connect(process.env.MongoURL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })