const { BASE_URL } = require("../utils/configURL");
const { sendError,sendSuccess } = require("../utils/responseHandler");
const Order = require("./oreder.model");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PaymentRequest = async (req, res) => {
  const { products, userId } = req.body;
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
    });

    res.json({ url: session.url });
  } catch (error) {
    return sendError(res, 500, "Failed to create payment", error);
  }
};




// Checkout Session
//  └─ line_items
//      └─ data[]
//         └─ price
//             └─ product (Product ID)

const confirmPayment = async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

    const paymentIntentId = session.payment_intent.id;
    let order = await Order.findOne({ orderId: paymentIntentId });

    // Check if the order doesn't exist
    if (!order) {
      // Map through line items and prepare the products
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));

      // Calculate the total amount (in dollars, assuming the original amount is in cents)
      const amount = session.amount_total / 100;

      // Create a new order object
      order = new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount: amount,
        email: session.client_email,
        status:
          session.payment_intent.status === "succeeded" ? "pending" : "failed",
      });
    } else {
      // If the order already exists, update its status based on the payment status
      order.status =
        session.payment_intent.status === "succeeded" ? "pending" : "failed";
    }

    await order.save();
    res.sendSuccess(res,200,"payment successfull",order)
  } catch (error) {
    return sendError(res, 500, "Failed to confirm payment", error);
  }
};

module.exports = {
  PaymentRequest,
  confirmPayment,
};



