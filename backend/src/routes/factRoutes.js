const express = require("express");
const router = express.Router();
const factController = require("../controllers/factController");

router.get("/external", factController.getCatFactFromExternalApi);
router.post("/like", factController.likeCatFact);
router.get("/liked/:userId", factController.getLikedCatFacts);
router.get("/popular", factController.getPopularCatFacts);

module.exports = router;
