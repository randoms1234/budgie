const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'db5017499668.hosting-data.io',
    user: 'dbu2074139',
    password:'budgieDB123',
    datebase: 'dbs14032782'

})

connection.connect()
connection.end()
module.exports = connection;