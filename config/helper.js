let  Mysqli  =  require ( 'mysqli' )

let conn = new Mysqli({
    host:  'localhost',
    post: 3306,
    user: 'rootuser',
    password: 'uGN#JcFAH!34ugb',
    db: 'mega_shop'
});

let db = conn.emit(false, '');

module.exports = {
    database: db
};