// dependencies
// ----------------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const sc_interaction  = require("./js/sc_interaction");
const main  = require("./js/main"); 


// set up server
// ---------------------------------------------------------------------
const app = express();
const port = 8000;
app.listen(process.env.PORT || port);
console.log("server is running on port " + port + "!");


// set up app
// ---------------------------------------------------------------------

// public folder for static files
app.use(express.static('public'));

// enable body parsing for json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
})); 


// database interfaces
// ---------------------------------------------------------------------
const pgp = require("pg-promise")({
    // Initialization Options
});

const connection = {
  user: "postgres", 							    // name of the user account
  database: "trader", 								// name of the database
  password: "7Yv9maYPDoyFTEuuhJ5U", 				// env var: PGPASSWORD
  host: "h2763847.stratoserver.net", 		        // Server hosting the postgres database (host: 'localhost')
  port: 5432, 										// env var: PGPORT
  max: 10, 											// max number of clients in the pool
  idleTimeoutMillis: 30000 						    // how long a client is allowed to remain idle before being closed
};


// get max outlier
const db = pgp(connection);
app.get('/trade1', function(req, res) {
  
    var queryString = "select * from t_kline_5 limit 1";
    try {
		db.result(queryString, false)
		.then(result => {
			res.json(result.rows);
		})
		.catch(error => {
            console.log("Error in /ma_5:\n" + error);
            // errror log goes here
		});
	}
	catch(err) {
        console.log('failed to call /ma_5:\n' + err);
        // errror log goes here
    }	
    	
});


// execute main server logic
// --------------------------
//main.main();


// web3 interface
// ---------------------------------------------------------------------
console.log("-> start web3 interfaces !"); 

var web3 = require('web3');
tmpWeb3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
console.log(tmpWeb3.currentProvider);








