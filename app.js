const bodyParser = require("body-parser");
const weatherRoute = require("./routes/weatherRoute");
const express = require("express");

const PORT = 8080;

const app = express();

app.use(bodyParser.json());

app.use("/weather", weatherRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Not Connected !!", err);
  } else {
    console.log(`Connected!!\nlocation : http://localhost:${PORT}`);
  }
});
