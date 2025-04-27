const Card = require("../models/cardData");

// Get all cards
const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a card by ID
const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const deletedCard = await Card.findOneAndDelete({ id: cardId });

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Deleted card successfully", deletedCard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new card
const addCard = async (req, res) => {
  try {
    const { name, role, email } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCard = new Card({
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      name,
      role,
      email,
    });

    await newCard.save();
    res.status(201).json({ message: "Card added successfully", newCard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing card by ID
const updateCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const { name, role, email } = req.body;

    const updatedCard = await Card.findOneAndUpdate(
      { id: cardId },
      { name, role, email },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card updated successfully", updatedCard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCards, deleteCard, addCard, updateCard };
