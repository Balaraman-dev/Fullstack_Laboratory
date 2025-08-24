import express from "express";
const app = express();
const PORT = 3000;
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

connectDB();

app.use("/", userRoutes);
// app.get('/', (req, res) => {
//   res.send('Hello from Express!');
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
})