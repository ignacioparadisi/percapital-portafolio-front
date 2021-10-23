const express = require('express');

app = express();

app.use(express.static('./dist/percapital-portfolio-front'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: 'dist/percapital-portfolio-front/'});
});

app.listen(process.env.PORT || 8080);