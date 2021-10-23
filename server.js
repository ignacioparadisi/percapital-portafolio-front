const express = require('express');

app = express();

app.use(express.static('./dist/percapital-portafolio-front'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: 'dist/percapital-portafolio-front/'});
});

app.listen(process.env.PORT || 4200);