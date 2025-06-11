const factService = require("../services/factService");
const { handleApiRequest } = require("../utils/apiHandler");

exports.getCatFactFromExternalApi = handleApiRequest(
  factService.getCatFactFromExternalApi
);

exports.likeCatFact = handleApiRequest(async (body) => {
  const { userId, factText } = body;
  return await factService.likeCatFact(userId, factText);
});

exports.getLikedCatFacts = handleApiRequest(async (body, req, params) => {
  const { userId } = params;
  try {
    return await factService.getLikedCatFacts(userId);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }
    throw error;
  }
});

exports.getPopularCatFacts = handleApiRequest(factService.getPopularCatFacts);
