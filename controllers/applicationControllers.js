const Application = require("../models/applicationModel");
const expressAsyncHandler = require("express-async-handler");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");

const getMyApplications = expressAsyncHandler(async (req, res) => {
  const { user } = req;

  const applications = await Application.find({ user: user.id })
    .populate("opportunity", "title")
    .sort({ createdAt: -1 });

  return sendSuccessResponse(
    res,
    200,
    "Your opportunities fetched successfully",
    { applications }
  );
});

const withdrawApplication = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { applicationId } = req.params;

  let application = await Application.findById(applicationId);
  if (!application) {
    return sendErrorResponse(res, 404, "Application does not exist");
  }

  if (application.user.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You can only withdraw applications that you have applied"
    );
  }

  await Application.findByIdAndDelete(applicationId);

  return sendSuccessResponse(
    res,
    200,
    "Your application have been successfully withdrawn"
  );
});

module.exports = {
  getMyApplications,
  withdrawApplication,
};
