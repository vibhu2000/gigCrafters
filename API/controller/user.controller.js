import User from "../models/user.models.js";
import createErrors from "../utils/createErrors.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createErrors(403, "You can delete only your account..."));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("User Deleted....");
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const getUsers = async (req, res) => {
  const user = await User.find();

  res.status(200).send(user);
};