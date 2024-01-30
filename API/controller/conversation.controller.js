import createErrors from "../utils/createErrors.js";
import Conversation from "../models/conversation.models.js";


export const createConversation = async (req, res, next) => {
  //we are just starting a convo here, not adding any msg
  const newConversation = new Conversation({
    //sellerid + buyerid
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId, //req.body.to is buyer id

    //below line if we seller then out id else buyerid
    sellerId: req.isSeller ? req.userId : req.body.to, //req.userID=seller id
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller, //if we are starting any convo then its gonna be true so req.isSEller
    readByBuyer: !req.isSeller, //other person will not see our msg immediatelty so false
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(error);
  }
};



//update the readBySeller or buyer info, here when we open a msg readByBuyer will be true readBySeleer will be false bcz we are logged in as buyer(not as a seller) if we are seller then opposite
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id }, 
      
      {
        $set: {
          //now updating it using $set
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }         //to see new convo, updated convo after setting it, 
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({ id: req.params.id });
        if (!conversation) return next(createErrors(404, "Not found!"));
        res.status(200).send(conversation);
      } catch (err) {
        next(err);
      }
};

export const getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find(
          req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
        ).sort({ updatedAt: -1 });
        res.status(200).send(conversations);
      } catch (err) {
        next(err);
      }
};