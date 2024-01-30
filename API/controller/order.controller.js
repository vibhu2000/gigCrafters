import createErrors from "../utils/createErrors.js";
import Gig from "../models/gig.models.js";
import Order from "../models/order.models.js";
import Stripe from "stripe";

export const intent = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRETKEY);

  //fetching the product
  const gig = await Gig.findById(req.params.id)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,        //*100 bcz we need value in dollars not in cents
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id, //why ._id?
    img: gig.cover, //why not body.cover
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
};

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);
//     const newOrder = new Order({
//       gigId: gig._id, //why ._id?
//       img: gig.cover, //why not body.cover
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: "temporary",
//     });

//     await newOrder.save();
//     res.status(200).send("successful");
//   } catch (error) {
//     next(error);
//   }
// };

//we are gonna fetch only our orders using the userId

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      // sellerid ya buyerid m se koe ek username hoga(jo logged in hoga)
      //agr seller ne login kra to uske saare orders aajye same for buyer
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed!");
  } catch (err) {
    next(err);
  }
};
