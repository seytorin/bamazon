var mysql = require('mysql');
var prompt = require('prompt');

var idSelect = null;
var stockQuant = null;
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "panther9",
  database: "bamazon"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + con.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  con.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.log("What is the ID of the item? ");
    
});
}
    function idUserSelect() {
  console.log("Selecting all products with ID: " + idSelect + "\n");
  con.query("SELECT * FROM products WHERE item_id=? OR stock_quantity=?", [idSelect, stockQuant], function(err, res) {
     for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
   
    console.log("-----------------------------------");
    if (err) throw err;
    // Log all results of the SELECT statement
  
    
    con.end();
  });
}
  prompt.start();

prompt.get(['id', 'quant'], function(err, results){
	
	   results.id;
	   console.log("How many would you like? " + results.quant);
	   idSelect = results.id;
	   stockQuant = results.quant;
	   console.log(stockQuant);
	 if(idSelect !== null || stockQuant != null){
	 	
	 	idUserSelect();
	}
});


