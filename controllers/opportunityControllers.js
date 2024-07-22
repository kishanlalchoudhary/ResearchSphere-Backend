const Opportunity = require("../models/opportunityModel");
const expressAsyncHandler = require("express-async-handler");

const createOpportunity = expressAsyncHandler(async (req, res) => {});

const editOpportunity = expressAsyncHandler(async (req, res) => {});

const deleteOpportunity = expressAsyncHandler(async (req, res) => {});

const getMyOpportunities = expressAsyncHandler(async (req, res) => {});

const getAllOpportunities = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createOpportunity,
  editOpportunity,
  deleteOpportunity,
  getMyOpportunities,
  getAllOpportunities,
};
