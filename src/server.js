const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
var cron = require("node-cron");
const LackController = require("./controllers/LackController");

mongoose.connect(
  "mongodb+srv://ifpi:ifpi@clusterifpi.gzbaa.mongodb.net/refeitorio?retryWrites=true&w=majority",
  {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// mongoose.connect('mongodb://127.0.0.1:27017/ifpi_refeitorio');
cron.schedule("00 00 12 * * 0-6", LackController.jobLack);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT || 3334, () => {
  console.log("api running");
});
