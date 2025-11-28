const { BASE_URL } = require("../utils/configURL");
const { sendError, sendSuccess } = require("../utils/responseHandler");
const Order = require("./oreder.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
const PaymentRequest = async (req, res) => {
  const { products, userId, email } = req.body; // frontend থেকে userId & email নিয়ে আসা

  if (!userId || !email) {
    return sendError(res, 400, "UserId and email are required");
  }

  try {
    const line_items = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/cancel`,
      metadata: {
        userId: userId, // <-- important
        email: email,   // <-- optional if you want to be safe
      },
      customer_email: email, // <-- optional: ensures session.client_client_email exists
    });

    res.json({ url: session.url });
  } catch (error) {
    return sendError(res, 500, "Failed to create payment", error);
  }
};

// Confirm Payment after success
const confirmPayment = async (req, res) => {
  const { session_id } = req.body;
  console.log("Received session_id:", session_id);

  if (!session_id) {
    return sendError(res, 400, "Session ID is required");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });
    console.log("Retrieved session:", session);

    const paymentIntentId = session.payment_intent.id;

    // Check if order already exists
    let order = await Order.findOne({ orderId: paymentIntentId });
    console.log("Existing order:", order);

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));

      const amount = session.amount_total / 100;
      const userId = session.metadata.userId; // <-- get from metadata
      const email = session.customer_details?.email || session.metadata.email || "noemail@example.com";

      if (!userId || !email) {
        return sendError(res, 400, "User ID or Email missing in session");
      }

      order = new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount: amount,
        userId: userId,
        email: email,
        status: session.payment_intent.status === "succeeded" ? "pending" : "failed",
      });
      console.log("New order to be saved:", order);
    } else {
      // update status if order exists
      order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed";
      console.log("Updated order to be saved:", order);
    }

    await order.save();
    console.log("Order saved successfully");
    sendSuccess(res, 200, "Payment successful", order);
  } catch (error) {
    console.error("Failed to confirm payment:", error);
    return sendError(res, 500, "Failed to confirm payment", error);
  }
};

module.exports = {
  PaymentRequest,
  confirmPayment,
};
