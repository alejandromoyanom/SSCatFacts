const axios = require("axios");
const CatFact = require("../models/CatFact");
const User = require("../models/User");
const { Sequelize, Op } = require("sequelize");
exports.getCatFactFromExternalApi = async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching cat fact from external API:", error);
    res.status(500).json({ message: "Error fetching cat fact" });
  }
};

exports.likeCatFact = async (req, res) => {
  const { userId, factText } = req.body;

  if (!userId || !factText) {
    return res
      .status(400)
      .json({ message: "userId and factText are required" });
  }

  const factId = factText;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [catFact, created] = await CatFact.findOrCreate({
      where: { UserId: userId, factId: factId },
      defaults: { factText: factText },
    });

    if (!created) {
      return res.status(200).json({
        message: "Cat Fact ya está marcado con 'me gusta' por este usuario",
        catFact,
      });
    }

    res
      .status(201)
      .json({ message: "Cat Fact marcado como 'me gusta' con éxito", catFact });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Cat Fact ya está marcado con 'me gusta' por este usuario.",
      });
    }
    console.error("Error liking cat fact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLikedCatFacts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedFacts = await CatFact.findAll({
      where: { UserId: userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(likedFacts || []);
  } catch (error) {
    console.error("Error fetching liked cat facts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPopularCatFacts = async (req, res) => {
  try {
    const popularFacts = await CatFact.findAll({
      attributes: [
        "factText",
        [Sequelize.fn("COUNT", Sequelize.col("factId")), "likeCount"],
      ],
      group: ["factText"],
      order: [[Sequelize.literal('"likeCount"'), "DESC"]],
      limit: 10,
    });

    res.status(200).json(popularFacts);
  } catch (error) {
    console.error("Error fetching popular cat facts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
