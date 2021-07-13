const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://ifpi:<password>@clusterifpi.gzbaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000);