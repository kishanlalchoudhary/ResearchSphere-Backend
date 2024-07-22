const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const sendErrorResponse = require("../utils/sendErrorResponse");

const getMyProfile = expressAsyncHandler(async (req, res) => {
  const { user } = req;

  const profile = await User.findById(user.id).select(
    "name email profession about contactNo domains skills"
  );

  return sendSuccessResponse(res, 200, "Profile fetched successfully", {
    profile,
  });
});

const getProfileById = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await User.findById(userId).select(
    "name email profession about contactNo domains skills"
  );

  return sendSuccessResponse(
    res,
    200,
    `Profile with User Id ${userId} fetched successfully`,
    {
      profile,
    }
  );
});

const editMyProfile = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const { name, profession, about, contactNo, domains, skills } = req.body;

  if (!name || !profession || !about || !contactNo || !domains || !skills) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  if(contactNo.length < 10){
    return sendErrorResponse(
      res,
      400,
      "Contact number must be at least 10 digits long"
    );
  }

  await User.findByIdAndUpdate(user.id, {
    name,
    profession,
    about,
    contactNo,
    domains,
    skills,
  });

  return sendSuccessResponse(res, 200, "Profile updated successfully");
});

module.exports = { getMyProfile, getProfileById, editMyProfile };
