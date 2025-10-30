class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.status =
      statusCode >= 400 && statusCode < 500 ? "Client Error" : "Server Error";
    this.isOperationalError = true; // distinguish expected vs unexpected errors

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new CustomError(message, 400);
  }

  static unauthorized(message = "Unauthorized") {
    return new CustomError(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return new CustomError(message, 403);
  }

  static notFound(message = "Not Found") {
    return new CustomError(message, 404);
  }

  static conflict(message = "Conflict") {
    return new CustomError(message, 409);
  }

  static internalServer(message = "Internal Server Error") {
    return new CustomError(message, 500);
  }
}

module.exports = CustomError;

// //Example Usage
// const CustomError = require("../utils/CustomError");

// exports.getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       throw CustomError.notFound("User not found");
//     }

//     res.json(user);
//   } catch (err) {
//     next(err); // handled by error middleware
//   }
// };
