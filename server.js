const express = require('express');
const htmlRoute = require('./routes/htmlRoute.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', htmlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});