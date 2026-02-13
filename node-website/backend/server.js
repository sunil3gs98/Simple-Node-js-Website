const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// API endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Website successfully served using Nginx 🚀" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
