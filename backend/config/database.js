require('dotenv').config();

const config = {
  development : {
    username : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    host : process.env.DATABASE_URIDATABASE_URI,
    dialect : 'postgres'
  },
  test : {
    username : null, 
    password : null,
    database : null,
    host : null,
    dialect : 'postgres'
  },
  production : {
    use_env_variable : 'DATABASE:_URL'
  }
}

module.exports = config; 


