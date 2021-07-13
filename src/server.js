const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);
// mongodb+srv://ifpi:<password>@clusterifpi.gzbaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.listen(process.env.PORT || 3000);
