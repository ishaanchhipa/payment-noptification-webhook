const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const paymentData = req.body;
    console.log('Payment received:', paymentData);

    // Process the payment data here (e.g., update database, trigger stream notifications)

    res.status(200).send('Webhook received');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
