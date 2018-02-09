var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "panther9",
  database: "bamazon"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES ?";
  var values = [
    [226,'chocolate','foods',10,500],
    [331,'tires','auto',350,20],
    [851,'bread','foods',2,1500],
    [350,'phones','electronics',750,2000],
    [822,'remotes','electronics',20,50],
    [411,'water','foods',2,399],
    [838,'bulb','lights',12,44],
    [339,'mouse','computers',20,233],
    [388,'shirt','clothing',44,33],
    [293,'tuna','foods',1,500],
   
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

