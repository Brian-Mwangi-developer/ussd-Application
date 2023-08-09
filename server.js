const express = require('express');
const bodyParser = require('body-parser');
const AfricasTalking = require('africastalking')
require('dotenv').config()
const app = express();


//Initialize Africa's talking
const africastalking = AfricasTalking({
    apiKey:process.env.API_KEY,
    username:'africasmsApp'
})

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));

// USSD route
app.post('/ussd',async (req, res) => {
  const sessionId = req.body.sessionId;
  const serviceCode = req.body.serviceCode;
  const phoneNumber = req.body.phoneNumber;
  const text = req.body.text.trim();

  // Your USSD logic here
  let response = '';
  if(text === '') {
  //initial Ussd Prompt
  response ='CON Welcome to DigiBox.\n';
  response += '1. Share a Document.\n';
  response += '2. Exit';
}else if(text ==='1'){
    //Ask for the Receipient Number
    response = 'CON Enter recipient Number'
}else if(text.startsWith('1*')){
    //Handle Receipient Number
    const phoneNumber = text.split('*')[1];
    // Generate a unique link for the document 
    // Remove the leading zero and replace with +254
    const recipientPhoneNumber = phoneNumber.substring(1);
    const newRecipientPhoneNumber =`+254${recipientPhoneNumber}`
    console.log( 
        newRecipientPhoneNumber,
        recipientPhoneNumber
    )
    // Generate a unique link for the document
    const documentLink = 'https://example.com/document/xyz123';
    // Compose the sms message
    const smsMessage = `Hi ${newRecipientPhoneNumber},You've received a document. Click the link to access:${documentLink}`;

    // Send the sms message using Africa's talking
    const sms = africastalking.SMS;
    const options = {
      to:newRecipientPhoneNumber,
      message: smsMessage
    };
    sms.send(options)
      .then(() => {
        response = 'END Document link has been sent via SMS.';
      })
      .catch(error => {
        console.error(error);
        response = 'END An error occurred. Please try again later.';
      });
}
else if (text === '2') {
    // Exit the USSD session
    response = 'END Thank you for using our service.';
  } else {
    // Invalid input
    response = 'CON Invalid input. Please try again.';
  }
  res.contentType('text/plain');
  res.send(response);

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
