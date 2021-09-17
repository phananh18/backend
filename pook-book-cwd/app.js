import "dotenv/config";
require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
import { connect } from 'mongoose';
import express from 'express';
import bodyParser, { json } from 'body-parser';
import path from 'path'

const app = express();
app.use(json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));


import userRoute from './src/routes/userRoute';
import authorRoute from './src/routes/authorRoute';
import publisherRoute from './src/routes/publisherRoute';
import categoryRoute from './src/routes/categoryRoute'
import productRoute from './src/routes/productRoute'


connect(process.env.DATABASE_CONNECTION, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('====================================');
    console.log("Connected to database");
    console.log('====================================');
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('====================================');
    console.log("Connected to server ");
    console.log('====================================');
})

app.use("/public", express.static(path.join(__dirname, "public")));


app.use(`/api/v1/user`,userRoute);
app.use(`/api/v1/author`,authorRoute);
app.use(`/api/v1/publisher`,publisherRoute);
app.use(`/api/v1/category`,categoryRoute)
app.use(`/api/v1/products`,productRoute)




