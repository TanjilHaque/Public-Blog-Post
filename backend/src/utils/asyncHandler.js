// Exporting asyncHandler function so it can be used in other files
exports.asyncHandler = (func) => {
  // asyncHandler takes a function (func) as an argument.
  // That function will usually be a route handler (req, res) => { ... }

  return async (req, res, next) => {
    // Returning a new async function (middleware) that Express can use.
    // This function receives req, res, and next from Express.

    try {
      // Try running the passed-in route handler function
      // "func" might be something like: async (req, res) => { ... }
      await func(req, res);
    } catch (error) {
      // If an error happens inside func, it will be caught here.
      console.log("Error from asyncHandler function");

      // Passing the error to Express's default error handler
      // (or a custom one if defined). "next(error)" ensures Express
      // knows something went wrong and can handle it properly.
      next(error);
    }
  };
};
