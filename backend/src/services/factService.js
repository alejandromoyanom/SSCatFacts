const axios = require("axios");
const CatFact = require("../models/CatFact");
const User = require("../models/User");
const { Sequelize, Op } = require("sequelize");

exports.getCatFactFromExternalApi = async () => {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    return response.data;
  } catch (error) {
    console.error("Error fetching cat fact from external API:", error);
    throw new Error("Error fetching cat fact");
  }
};

exports.likeCatFact = async (userId, factText) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const [catFact, created] = await CatFact.findOrCreate({
      where: { UserId: userId, factText: factText },
      defaults: {},
    });

    if (!created) {
      return {
        message: "Cat Fact ya está marcado con 'me gusta' por este usuario",
        catFact,
      };
    }

    return { message: "Cat Fact marcado como 'me gusta' con éxito", catFact };
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(
        "Cat Fact ya está marcado con 'me gusta' por este usuario."
      );
    }
    console.error("Error liking cat fact:", error);
    throw new Error("Internal server error");
  }
};

exports.getLikedCatFacts = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const likedFacts = await CatFact.findAll({
      where: { UserId: userId },
      order: [["createdAt", "DESC"]],
    });

    return likedFacts || [];
  } catch (error) {
    console.error("Error fetching liked cat facts:", error);
    throw error;
  }
};

exports.getPopularCatFacts = async () => {
  try {
    const popularFacts = await CatFact.findAll({
      attributes: [
        "factText",
        [Sequelize.fn("COUNT", Sequelize.col("factText")), "likeCount"],
      ],
      group: ["factText"],
      order: [[Sequelize.literal('"likeCount"'), "DESC"]],
      limit: 10,
    });

    return popularFacts;
  } catch (error) {
    console.error("Error fetching popular cat facts:", error);
    throw new Error("Internal server error");
  }
};
