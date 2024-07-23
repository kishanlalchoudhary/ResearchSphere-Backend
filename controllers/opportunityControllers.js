const Opportunity = require("../models/opportunityModel");
const Application = require("../models/applicationModel");
const expressAsyncHandler = require("express-async-handler");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");

const createOpportunity = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { title, description, startDate, endDate, domains, skills } = req.body;

  if (!title || !description || !startDate || !endDate || !domains || !skills) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (endDate < startDate) {
    return sendSuccessResponse(
      res,
      400,
      "End date should be after the start date"
    );
  }

  const opportunity = await Opportunity({
    title,
    description,
    startDate,
    endDate,
    domains,
    skills,
    owner: user.id,
  });
  await opportunity.save();

  return sendSuccessResponse(res, 201, "Your opportunity has been created");
});

const editOpportunity = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { opportunityId } = req.params;
  const { title, description, startDate, endDate, domains, skills } = req.body;

  if (!title || !description || !startDate || !endDate || !domains || !skills) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if (endDate < startDate) {
    return sendSuccessResponse(
      res,
      400,
      "End date should be after the start date"
    );
  }

  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) {
    return sendErrorResponse(res, 404, "Opportunity does not exist");
  }

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(res, 403, "You cannot edit this opportunity");
  }

  await Opportunity.findByIdAndUpdate(opportunityId, {
    title,
    description,
    startDate,
    endDate,
    domains,
    skills,
  });

  return sendSuccessResponse(res, 200, "Opportunity updated successfully");
});

const deleteOpportunity = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { opportunityId } = req.params;

  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) {
    return sendErrorResponse(res, 404, "Opportunity does not exist");
  }

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(res, 403, "You cannot delete this opportunity");
  }

  await Opportunity.findByIdAndDelete(opportunityId);

  return sendSuccessResponse(res, 200, "Opportunity deleted successfully");
});

const getAllOpportunities = expressAsyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find().populate("owner", "name");

  return sendSuccessResponse(res, 200, "Opportunities fetched successfully", {
    opportunities,
  });
});

const getAllOpportunityById = expressAsyncHandler(async (req, res) => {
  const { opportunityId } = req.params;

  const opportunity = await Opportunity.findById(opportunityId).populate(
    "owner",
    "name"
  );
  if (!opportunity) {
    return sendErrorResponse(res, 404, `Opportunity does not exist`);
  }

  return sendSuccessResponse(res, 200, `Opportunity fetched successfully`, {
    opportunity,
  });
});

const getMyOpportunities = expressAsyncHandler(async (req, res) => {
  const { user } = req;

  const opportunities = await Opportunity.find({ owner: user.id });

  return sendSuccessResponse(
    res,
    200,
    "Your opportunities fetched successfully",
    {
      opportunities,
    }
  );
});

const getMyOpportunityById = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { opportunityId } = req.params;

  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) {
    return sendErrorResponse(res, 404, `Opportunity does not exist`);
  }

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(res, 403, "You cannot access this opportunity");
  }

  return sendSuccessResponse(res, 200, `Opportunity fetched successfully`, {
    opportunity,
  });
});

const applyForOpportunity = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { opportunityId } = req.params;

  let application = await Application.findOne({
    opportunity: opportunityId,
    user: user.id,
  });
  if (application) {
    return sendErrorResponse(
      res,
      400,
      "You have already applied for the opportunity"
    );
  }

  application = await Application({
    opportunity: opportunityId,
    user: user.id,
  });
  await application.save();

  return sendSuccessResponse(
    res,
    200,
    "You have successfully applied for the opportunity"
  );
});

const getMyOpportunityApplications = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { opportunityId } = req.params;

  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) {
    return sendErrorResponse(res, 404, "Opportunity does not exist");
  }

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You cannot access applications for this opportunity"
    );
  }

  const applications = await Application.find({
    opportunity: opportunityId,
  }).populate("user", ["name", "email"]);

  return sendSuccessResponse(
    res,
    200,
    "Your opportunity applications have been fetched successfully.",
    {
      applications,
    }
  );
});

const acceptApplication = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { applicationId } = req.params;

  const application = await Application.findById(applicationId).populate(
    "opportunity",
    "owner"
  );
  if (!application) {
    return sendErrorResponse(res, 404, "Application does not exist");
  }

  if (application.opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You cannot accept application for this opportunity"
    );
  }

  if (application.status !== "Pending") {
    return sendErrorResponse(
      res,
      400,
      "Application is already accepted or rejected"
    );
  }

  await Application.findByIdAndUpdate(applicationId, { status: "Accepted" });

  return sendSuccessResponse(res, 200, "Application accepted successfully");
});

const rejectApplication = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { applicationId } = req.params;

  const application = await Application.findById(applicationId).populate(
    "opportunity",
    "owner"
  );
  if (!application) {
    return sendErrorResponse(res, 404, "Application does not exist");
  }

  if (application.opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You cannot reject applications for the opportunity you have created"
    );
  }

  if (application.status !== "Pending") {
    return sendErrorResponse(
      res,
      400,
      "Application is already accepted or rejected"
    );
  }

  await Application.findByIdAndUpdate(applicationId, { status: "Rejected" });

  return sendSuccessResponse(res, 200, "Application rejected successfully");
});

module.exports = {
  createOpportunity,
  editOpportunity,
  deleteOpportunity,
  getAllOpportunities,
  getAllOpportunityById,
  getMyOpportunities,
  getMyOpportunityById,
  applyForOpportunity,
  getMyOpportunityApplications,
  acceptApplication,
  rejectApplication,
};
