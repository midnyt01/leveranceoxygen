const mysql = require('mysql')


const db = mysql.createPool({
    host : '217.21.95.103',
    user:'u391245239_lev_admin',
    password:'2ihxda3Y.nSj8WG',
    database: 'u391245239_leverance_db',
    connectionLimit: 10
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