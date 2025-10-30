const apiResponse = class ApiResponse {
  constructor(status, message, data) {
    // Instead of directly storing the numeric status code as "success" or "fail"
    // we add a human-readable "status" field
    this.status = status >= 200 && status < 300 ? "OK" : "Error";

    // Keep the actual HTTP status code
    this.statusCode = status || 500;

    // Default message is "Success" if none provided
    this.message = message || "Success";

    // Data being returned
    this.data = data;
  }

  // A helper function to directly send a formatted JSON response
  static sendSuccess(res, status, message, data) {
    // Create an instance of ApiResponse and send as JSON
    return res.status(status).json(new apiResponse(status, message, data));
  }
};

module.exports = { apiResponse };
