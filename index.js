const stripe= require('stripe')('sk_test_51MmgZ7SGYRgpMBwBaCEGZPwwxWobAJvb4kfmvbmi31ekN7P5oSJGzPz2nF7wpE0nsYlzOLaWHdaPYPX7gAWCKxtS00kOhmlZfL')
const cors= require('cors')
const express = require('express')
const bodyParser = require ('body-parser') 
const app = express()
app.use(cors());
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}

    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3000,
      currency: 'INR',
      customer: customer.id,
      payment_method_types : ['card'],
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id, 
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
