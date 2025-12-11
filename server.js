
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Get Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error("Stripe secret key not found. Make sure you have a .env file with STRIPE_SECRET_KEY set.");
  process.exit(1);
}
const stripe = new Stripe(stripeSecretKey);

// Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST'] })); // Allow all origins for simplicity
app.use(express.json());
app.use(express.static('public')); // Serve static files from public folder

const YOUR_DOMAIN = 'http://localhost:5173'; // Make sure this matches your React app's address

// Route to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
    const { items, taxRate } = req.body;

    try {
        // Create an array of line items for the Stripe session
        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    metadata: { id: item.id }
                },
                unit_amount: Math.round(item.price * 100), // Price in cents
            },
            quantity: item.quantity,
        }));

        // Create the Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment-failed`,
            shipping_address_collection: {
              allowed_countries: ['US', 'CA', 'MX', 'GB', 'DE', 'FR', 'ES', 'AU'], // Add more countries as needed
            },
            billing_address_collection: 'required',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Webhook endpoint for Stripe to send events to
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`Payment successful for session ID: ${session.id}`);
      // TODO: Fulfill the order - e.g., save order details to a database
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
