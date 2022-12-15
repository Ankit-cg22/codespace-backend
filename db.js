const Pool = require('pg').Pool
require('dotenv').config()

const devConfig = {
    user: process.env.PGUSER ,
    password : process.env.PGPASSWORD,
    host : process.env.PGHOST,
    port : process.env.PGPORT  ,
    database : process.env.PGDATABASE
}

const prodConfig ={
    connectionString:  process.env.DATABASE_URL,
    // comes from heroku add on 
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig,);

module.exports = pool;