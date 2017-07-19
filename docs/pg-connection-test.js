var pg = require("pg");

var conString = "postgres://postgres:amitesh123@localhost:5432/playground_db";


// pg.connect(conString, onConnect);

// function onConnect(err, client, done) {
//     //Err - This means something went wrong connecting to the database.
//     if (err) {
//         console.log('Not connected!!');
//         console.error(err);
//         process.exit(1);
//     }else{
//         console.log('connected!!');
//     }
//
//     //For now let's end client
//     client.end();
// }


var client = new pg.Client(conString);
client.connect();

var query = client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",function(err, result) {
    console.log(result);
});

// client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
//
// var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
// query.on("row", function (row, result) {
//     result.addRow(row);
// });
// query.on("end", function (result) {
//     console.log(JSON.stringify(result.rows, null, "    "));
//     client.end();
// });