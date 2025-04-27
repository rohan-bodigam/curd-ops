const express = require("express");
const router = express.Router();
const { getCards, deleteCard, addCard, updateCard } = require("../controllers/cardController");

// Define Routes
router.get("/get", getCards);
router.delete("/delete/:id", deleteCard);
router.post("/add", addCard);
router.put("/update/:id", updateCard);

module.exports = router;
