const Opportunity = require("../models/opportunityModel");
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

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You can only edit opportunities that you have created"
    );
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
    return sendErrorResponse(
      res,
      400,
      "Opportunity you’re trying to delete can't be found"
    );
  }

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You can only delete opportunities that you have created"
    );
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
    return sendErrorResponse(
      res,
      400,
      `Opportunity with ID ${opportunityId} does not exist`
    );
  }

  return sendSuccessResponse(
    res,
    200,
    `Opportunity with ID ${opportunityId} fetched successfully`,
    {
      opportunity,
    }
  );
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
    return sendErrorResponse(
      res,
      400,
      `Opportunity with ID ${opportunityId} does not exist`
    );
  }

  if (opportunity.owner.toString() !== user.id) {
    return sendErrorResponse(
      res,
      403,
      "You cannot fetch this opportunity as you did not create it"
    );
  }

  return sendSuccessResponse(
    res,
    200,
    `Opportunity with ID ${opportunityId} fetched successfully`,
    {
      opportunity,
    }
  );
});

module.exports = {
  createOpportunity,
  editOpportunity,
  deleteOpportunity,
  getMyOpportunities,
  getMyOpportunityById,
  getAllOpportunities,
  getAllOpportunityById,
};
