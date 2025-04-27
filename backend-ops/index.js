// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// let cardInfo = [
//   { id: 1, name: "rohan", role: "web developer", Email: "rohan123@gmail.com" },
//   { id: 2, name: "chiti", role: "web assistant", Email: "chitti29@gmail.com" },
//   { id: 3, name: "sonu", role: "assistant", Email: "chitti29@gmail.com" },
//   { id: 4, name: "harshit", role: "jr assistant", Email: "chitti29@gmail.com" },
//   { id: 5, name: "varshit", role: "UI/UX", Email: "chitti29@gmail.com" },
//   { id: 6, name: "joshi", role: "Sr software eng", Email: "chitti29@gmail.com" },
// ];

// app.get("/get", function (req, res) {
//   res.json(cardInfo); 
// });

// app.delete("/delete/:id" , function(req,res) {
//   const deleteCard = parseInt(req.params.id);
//   cardInfo = cardInfo.filter(cards => cards.id != deleteCard)
//   res.json({ message: "Deleted user successfully", cardInfo });
// })

// app.post("/add", function(req,res){
//   const {name , role , Email} = req.body;
//   if(!name || !role || !Email){
//     return res.status(400).json({message : "All fields are required"});
//   }
//   const newCard = {
//     id : Math.floor(Math.random() *1000),
//     name,
//     role,
//     Email
//   }
//   cardInfo.push(newCard);
//   res.status(201).json({message: "card added successfully" ,cardInfo})
// })

// app.put("/update/:id",function(req,res){
//   const cardId = parseInt(req.params.id);
//   const {name , role , Email} = req.body;
  
//   const cardIndex = cardInfo.findIndex(card => card.id === cardId);

//   if(cardIndex === -1){
//     return res.status(404).json({message : "card not found"});
//   }

//   cardInfo[cardIndex] = {...cardInfo[cardIndex], name ,role, Email};
//   res.json({message : "card updated successfully",cardInfo})
// });



// app.listen(7777, function () {
//   console.log("server is running..!!");
// }); 

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Card = require("./models/cardData"); // Import Card model

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Ensure JSON parsing

// Connect to MongoDB
connectDB();

// Import and Use Routes
const cardRoutes = require("./routes/cardRoutes");
app.use("/api/", cardRoutes);

// Sample card data
let cardInfo = [
  { id: 1, name: "rohan", role: "web developer", email: "rohan123@gmail.com" },
  { id: 2, name: "chiti", role: "web assistant", email: "chitti29@outlook.com" },
  { id: 3, name: "sonu", role: "assistant", email: "chitti08@gmail.com" },
  { id: 4, name: "harshit", role: "jr assistant", email: "bodigam29@gmail.com" },
  { id: 5, name: "varshit", role: "UI/UX", email: "varshit@gmail.com" },
  { id: 6, name: "joshi", role: "Sr software eng", email: "chocolate@gmail.com" },
];

// Function to insert data into MongoDB (WITHOUT duplicate check)
const insertData = async () => {
  try {
    await Card.insertMany(cardInfo);
    console.log("✅ Data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error.message);
  }
};

// Run insertData after database connection
insertData();

// Start the server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


