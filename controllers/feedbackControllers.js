const Feedback = require("../models/feedbackModel");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");

const submitFeedback = expressAsyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if ((!name, !email || !message)) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email address");
  }

  const feedback = await Feedback({ name, email, message });
  await feedback.save();

  return sendSuccessResponse(
    res,
    201,
    "Thank you! Your feedback has been received."
  );
});

const getFeedbacks = expressAsyncHandler(async (req, res) => {
  const { user } = req;

  const feedbacks = await Feedback.find().sort({ createdAt: -1 });

  return sendSuccessResponse(res, 200, "Feedbacks fetched successfully.", {
    feedbacks,
  });
});

module.exports = { submitFeedback, getFeedbacks };
