const express = require('express');

// Pacote que permite que o error handler funcione para funções assincronas
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);

// Error Handler - Middleware Express - Manipulador de error não tratados
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));
