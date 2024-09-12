const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());

// Webhook handler
app.post('/webhook', (req, res) => {
  const payment = req.body;
  console.log('Payment received:', payment);

  // Broadcast payment event to all connected clients
  io.emit('payment', { amount: payment.amount, sender: payment.sender });
  res.status(200).json({ message: 'Payment data received' });
});

// Set up socket.io to handle real-time connections
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
