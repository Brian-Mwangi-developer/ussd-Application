const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));

// USSD route
app.post('/ussd', (req, res) => {
  const sessionId = req.body.sessionId;
  const serviceCode = req.body.serviceCode;
  const phoneNumber = req.body.phoneNumber;
  const text = req.body.text;

  // Your USSD logic here
  const response = `CON Welcome to My USSD App\n1. Option One\n2. Option Two`;

  res.send(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
