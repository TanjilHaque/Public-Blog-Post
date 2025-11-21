const CustomError = require("../utils/customError");
const { apiResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const blogModel = require("../models/blog.model");
const { validateCreateBlogSchema } = require("../validation/blog.validation");
const { uploadCloudinaryFile } = require("../helpers/cloudinary");
const { generateAccessKey } = require("../helpers/generateAccessKey");

exports.createBlog = asyncHandler(async (req, res) => {
  const data = await validateCreateBlogSchema(req);
  if (!data) {
    throw CustomError.notFound("Data not found");
  }
  const imageFileUrl = await uploadCloudinaryFile(data?.image[0]?.path);
  const accessKey = generateAccessKey();
  const blogPost = await blogModel.create({
    title: data.title,
    description: data.description,
    image: imageFileUrl,
    accessKey,
  });
  if (!blogPost) {
    throw CustomError.internalServer("blogPost created failed");
  }
  apiResponse.sendSuccess(res, 200, "Blog posted successfully", data);
});
