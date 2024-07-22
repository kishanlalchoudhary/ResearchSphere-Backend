const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
const Feedback = require("../models/feedbackModel");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");

const saveFeedback = expressAsyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if ((!name, !email || !message)) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(
      res,
      400,
      "Oops! That doesn't look like a valid email address. Please try again."
    );
  }

  const feedback = await Feedback({ name, email, message });
  feedback.save();

  return sendSuccessResponse(
    res,
    201,
    "Thank you! Your feedback has been received."
  );
});

const getFeedbacks = expressAsyncHandler(async (req, res) => {
  const { user } = req;

  const feedbacks = await Feedback.find();

  return sendSuccessResponse(
    res,
    200,
    "Feedbacks fetched successfully. Here they are!",
    {
      feedbacks,
    }
  );
});

module.exports = { saveFeedback, getFeedbacks };
