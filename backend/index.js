require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/database/db");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
