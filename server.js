const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const { config } = require('dotenv');

config();

const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   // credentials: true,
// };

app.use(cors()); // corsOptions

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Greeting card" });
});

require("./app/routes/sent_email.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
