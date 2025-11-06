const Joi = require("joi");
const CustomError = require("../utils/customError");

const createBlogSchema = Joi.object({
  title: Joi.string().trim().max(50).required().messages({
    "string.empty": "Blog title is required.",
    "string.max": "Blog title must be less than 50 characters.",
    "any.required": "Blog title is a required field.",
  }),
  description: Joi.string().min(10).required(),
  image: Joi.array().items(Joi.object()).optional(),
  recent: Joi.boolean().optional(),
}).options({
  abortEarly: true,
  allowUnknown: true,
});

const updateBlogValidation = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  image: Joi.array().items(Joi.object()).optional(),
  recent: Joi.boolean().optional(),
}).min(1); // ensure at least 1 field is provided

// validation function for creating blog schema
exports.validateCreateBlogSchema = async (req) => {
  try {
    const value = await createBlogSchema.validateAsync(req.body);
    if (req.files || req.files.image.length === 0) {
      throw CustomError.notFound("ValidationError, Image not found");
    }
    const file = req.files.image[0];
    // allowed mimetypes (separate entries)
    const allowedMimeTypes = [
      "image/jpeg",
      "image/webp",
      "image/jpg",
      "image/gif",
      "image/png",
      // "image/png" // uncomment if you want to allow PNG
    ];

    if (!allowedMimeTypes.includes(file.mimitype)) {
      console.log("Invalid mimetype:", file.mimitype);
      throw CustomError.badRequest(
        "ValidationError, Only PNG, JPG, JPEG, and WebP files are allowed"
      );
    }
    // validate size (use file.size)
    if (file.size > 5 * 1024 * 1024) {
      throw CustomError.badRequest("ValidationError, Image must be under 5 MB");
    }
    return { title: value.title, image: req?.files?.image[0] };
  } catch (error) {
    console.log("error from validateCreateBlogSchema", error);
    throw CustomError.internalServer("Internal Validation Error");
  }
};

// validation function for blog update
exports.validateUpdateBlog = async (req) => {
  try {
    const value = await updateBlogValidation.validateAsync(req.body);
    return value;
  } catch (error) {
    console.error("Error from updateBlogValidation validation:", error);
    throw CustomError.badRequest(
      "Category validation for update failed",
      error
    );
  }
};
