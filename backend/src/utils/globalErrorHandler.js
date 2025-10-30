// Load environment variables from .env file (like NODE_ENV, PORT, DB_URL, etc.)
require("dotenv").config();

// ---------------------------
// Development Error Response
// ---------------------------
// In development, we want as much detail as possible so developers can debug easily.
const developmentErrorResponse = (error, res) => {
  // If error has a statusCode, use it. Otherwise, fallback to 500 (Internal Server Error).
  const statusCode = error.statusCode || 500;

  // Send a JSON response with full error details
  return res.status(statusCode).json({
    statusCode: error.statusCode, // e.g., 404, 500, etc.
    status: error.status, // "Client Error" or "Server Error"
    isOperationalError: error.isOperationalError, // true if it’s a controlled error
    message: error.message, // actual error message
    errorStack: error.stack, // full stack trace (useful for debugging)
  });
};

// ---------------------------
// Production Error Response
// ---------------------------
// In production, we want to hide internal details from users (security + clean API response).
const productionErrorResponse = (error, res) => {
  const statusCode = error.statusCode || 500;

  // If the error is operational (known/expected), show minimal details
  if (error.isOperationalError) {
    return res.status(statusCode).json({
      statusCode: error.statusCode,
      status: error.status, // "Client Error" or "Server Error"
      message: error.message, // still safe to show controlled error message
    });
  } else {
    // If it’s an unknown/unexpected error, don’t leak internal info.
    return res.status(statusCode).json({
      status: "Error",
      message: "Something went wrong, please try again later...",
    });
  }
};

// ---------------------------
// Global Error Handler Middleware
// ---------------------------
// Express will pass any error here (via next(err)).
// Based on environment, it decides how to respond.
exports.globalErrorHandler = (error, req, res, next) => {
  // In development -> show full details
  if (process.env.NODE_ENV === "development") {
    developmentErrorResponse(error, res);
  }

  // In production -> hide sensitive info
  if (process.env.NODE_ENV === "production") {
    productionErrorResponse(error, res);
  }
};
