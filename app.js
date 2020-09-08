const bodyParser =  require('body-parser');
const express = require('express');
const sequelize = require('./database/models/index').sequelize

const app = express();

const env = process.env.NODE_ENV || 'development';
if(env === 'development'){
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000
 
sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err)=> {
        console.log('Could not connect to database, ERROR::',err)
    })


    



app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})