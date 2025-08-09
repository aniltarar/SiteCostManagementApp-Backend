// packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

// routes import
const authRoute = require("./routes/authRoute.js")

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// config import
const swaggerSpec = require('./config/swagger.config.js');
const connectDatabase = require('./config/databaseConfig');

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Routes
app.use("/auth", authRoute);


// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDatabase().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
