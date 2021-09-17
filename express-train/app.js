// Babel
require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
  });


import express from 'express'
import shopRoute from './src/routers/shopRoute'

const app = express()

app.listen(8080,() => {
  console.log("Connected server successfully")
})

app.use('/shops',shopRoute)
