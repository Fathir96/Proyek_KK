const express = require('express');
const app = express();
const PORT = 3006;
const router = require('./router/router')
const errorHandler = require('./middleware/errorhandle')

app.use(express.json())

app.use('/', router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})