const express = require('express')

const dotenv = require('dotenv').config()
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")

const app = express()

// middleware

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)




module.exports = app;