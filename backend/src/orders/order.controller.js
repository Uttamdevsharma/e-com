const { BASE_URL } = require("../utils/configURL");
const { sendError, sendSuccess } = require("../utils/responseHandler");
const Order = require("./oreder.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
// Handles checkout button click: creates Stripe Checkout session and returns session URL for frontend redirect
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


//get orders by email address
const getOrdersByEmail = async(req,res) => {
  const email = req.params.email;

  try {
    if(!email){
      return sendError(res,400,"Email is required")
    }

    const orders = await Order.find({email : email}).sort({createdAt: -1})

    if(orders.length === 0 || !orders) {
      return sendError(res,404,"No orders found For this email")
    }
    return sendSuccess(res,200,"Orders fetched successfully",orders)

  }catch(error) {
    return sendSuccess(res,500,"Failed to get orders",error)
  }

}

//get order by orderId
const getOrdersByOrderId = async(req,res) => {
  const id = req.params.id

  try{
    const order = await Order.findById(id)

    if(!order){
      return sendError(res,404,"not found this order")
    }

    return sendSuccess(res,200,"Order Fetched SuccessFully",order)


  }catch(err) {
    return sendError(res,500,"order not Fetched successfully",err)
  }
}


const getAllOrders = async(req,res) => {

  try{
    const orders = await Order.find().sort({createdAt : -1})
    if(orders.length === 0 || !orders){
      return sendError(res,404,"No orders found")
    }

    return sendSuccess(res,200,"Order Fetch successFully",orders)
  }catch(err){
    sendError(res,500,"Failed to get all orders",err)
  }
}



const updateOrderStatus = async(req,res) => {

  const {id} = req.params
  const {status} = req.body

  try{
    if(!status){
      return sendError(res,400,"status is required")
    }


  const updateOrder = await Order.findByIdAndUpdate(id, {status , updateAt: Date.now()},{
      new:true,
      runValidators : true,
    })

    if(!updateOrder){
    return sendError(res,404,"Order not found")
    }

    return sendSuccess(res,200,"Order update successfully",updateOrder)

  }catch(err){
    sendError(res,500,"Failed to update",err)
  }
}


module.exports = {
  PaymentRequest,
  confirmPayment,
  getOrdersByEmail,
  getOrdersByOrderId,
  getAllOrders,
  updateOrderStatus
};









// PaymentRequest controller execution

// ইউজার Checkout button ক্লিক করলে execute হবে।

// এখানে Stripe Checkout session তৈরি হবে।

// success_url সেট করা থাকবে, যেখানে {CHECKOUT_SESSION_ID} থাকবে।

// Frontend redirect

// Session URL দিয়ে ইউজারকে Stripe page এ পাঠানো হবে।

// Payment success

// পেমেন্ট successful হলে success_url এ redirect হবে।

// URL থেকে আমরা session_id পাবো।

// ConfirmPayment controller

// Session ID নিয়ে Stripe থেকে session retrieve করা হবে।

// এখানে থাকবে products, user, quantity, total_amount, payment_intent id।

// Order check

// Payment intent ID দিয়ে দেখবো DB তে order আছে কিনা।

// যদি order থাকে → নতুন order তৈরি হবে না, শুধু status update করা হবে।

// যদি order না থাকে → নতুন order তৈরি করা হবে।

// Order create

// lineItems তৈরি হবে → প্রতিটি product এর ID এবং quantity।

// amount → session.amount_total / 100

// userId → session.metadata.userId

// email → session.customer_details.email অথবা metadata.email

// Save order

// সব data নিয়ে order DB তে save করা হবে।

// আর duplicate order হবে না।