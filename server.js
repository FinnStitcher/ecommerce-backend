const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// remember to turn off force once all the relations are done
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log('http://localhost:' + PORT);
    });
});