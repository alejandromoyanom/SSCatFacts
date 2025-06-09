const express = require("express");
const { connectDB, sequelize } = require("../config/database");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);

// Sincronizar modelos con la base de datos y levantar el servidor
const startServer = async () => {
  await connectDB();
  await sequelize.sync({ force: false });
  console.log("Database synced!");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

module.exports = app;
