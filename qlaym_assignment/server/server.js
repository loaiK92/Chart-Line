const app = require("express")();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const JSONStream = require("JSONStream"); // use JSONStream to get data as a stream
require("dotenv").config({ path: "./variables.env" });

// Enable Cross Origing Rescource sharing
// p.s. this code is copied from CROS on ExpressJS
app.use((req, res, next) => {
  // Set the headers of our response to allow communication with our server from a different domain or port
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect mongoose to database
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

// connect to database
const db = mongoose.connection;
db.on("error", err => {
  console.log(`connection error is ${err}`);
});
db.once("open", () => {
  console.log(`Database connection is open!!!`);
});

// create DB collection
const DataModel = db.collection("data");

// request to get data from database
app.get("/:variable", (req, res) => {
  // get the params value which is variable name
  const variable = req.params.variable;

  // create option object
  const options = { _id: 0 }; // to get all document regardless of their IDs

  // then add the variable name as a property to the option object with value true
  options[variable] = true; // to get all fields which has the variable name

  // search for the variable values in database
  DataModel.find()
    .project(options) // project option
    // .limit(300)
    .pipe(JSONStream.stringify()) // stringify the data using JSONStream
    .pipe(res.type("json")); // send data with type json
});

// run the server
const port = process.env.PORT || 9999;
http.listen(port, () => {
  console.log(`Server is running on port ${port}!!!`);
});
