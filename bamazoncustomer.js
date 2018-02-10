var mysql = require('mysql');
var prompt = require('prompt');

var idSelect = null;
var stockQuant = null;
var total = 0;
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
//Selects all products in database and displays them
function readProducts() {
  console.log("Selecting all products...\n");
  con.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.log("What is the ID of the item? ");
    
});
}
	//selects user specified data from Mysql
    function idUserSelect() {
  		console.log("Selecting all products with ID: " + idSelect + "\n");
  		//Makes query for item and quantity
  		con.query("SELECT * FROM products WHERE item_id=? OR stock_quantity=?", [idSelect, stockQuant], function(err, res) {
     

	  		
	     for (var i = 0; i < res.length; i++) {
	     	if(res[i].stock_quantity < stockQuant){
	     		console.log("Sorry. We don't have enough stock to satisfy this order.\n Please order " + res[i].stock_quantity + " or less." )
	     		startPrompt();

	     	}
	     	else{
	      		console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
	      		total = res[i].price * stockQuant;
	      		function updateProduct() {
	  				console.log("Updating all products");
	  				var query = con.query(
	    				"UPDATE products SET ? WHERE ?",
	    				[
	      					{
	        					stock_quantity: res[i].stock_quantity - stockQuant
	      					},
	      					{
	        					item_id: res[i].item_id
	      					}
	    				],
	    				function(err, res) {
	    					
	      					console.log(res.affectedRows + " item purchased and a quantity of " + stockQuant + "!\n" + "Your total is " + total + "\n");
	      					
	      					
	    				}
	  				);


				}
				updateProduct();
	  		}
	    }
	   
	    console.log("-----------------------------------");
	    // console.log(res.affectedRows + " item purchased!\n" + "Your total is " + total + "\n");
	      					
	    if (err) throw err;
	    // Log all results of the SELECT statement
	  
	    
	    con.end();
	  });
	}
prompt.start();

function startPrompt(){
 

	prompt.get(['id', 'quant'], function(err, results){
	
	   results.id;
	   console.log("How many would you like? " + results.quant);
	   idSelect = results.id;
	   stockQuant = results.quant;
	 
		
		if(idSelect !== null || stockQuant != null){
	 	
	 		idUserSelect();
		}
	});

}
startPrompt();
