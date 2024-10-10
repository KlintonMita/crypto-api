import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = "coinranking8ddd3baa4e9f384ae3bbc5895fe76c0d7b9b18599488a27c";

app.use(cors());

app.get("/api/cryptos", async (req, res) => {
  try {
    const response = await axios.get("https://api.coinranking.com/v2/coins", {
      headers: {
        "x-access-token": API_KEY,
      },
      params: {
        limit: 10,
      },
    });
    res.json(response.data.data.coins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from Coinranking API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
