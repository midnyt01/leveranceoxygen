const mysql = require('mysql')


const db = mysql.createPool({
    host : 'localhost',
    user:'root',
    password:'',
    database: 'leverance_demo_db',
    connectionLimit: 200 
})


function mysqlConnect () {
    db.getConnection((err) => {
        if (err) throw err
        console.log('mySQL is now connected')
    })
}

module.exports = {
    db,
    mysqlConnect
};