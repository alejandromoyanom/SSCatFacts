const express = require("express");
const { connectDB, sequelize } = require("../config/database");
const User = require("./models/User");
const CatFact = require("./models/CatFact");
const userRoutes = require("./routes/userRoutes");
const factRoutes = require("./routes/factRoutes");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/facts", factRoutes);

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ force: true });
  console.log("Database synced!");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

module.exports = app;
