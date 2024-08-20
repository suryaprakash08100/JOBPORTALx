//const express=require('express')
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";


const app = express()
dotenv.config()
app.use(express.json());
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use(errorMiddleware)
app.use(cors())
app.use(morgan("dev"))


connectDB();

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(chalk.bgWhite.red('Server Running ' + PORT))
})