const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/databaseConfig');

const authRoute = require("./routes/authRoute.js")


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


app.use("/auth", authRoute);

connectDatabase().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
