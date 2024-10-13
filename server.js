import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = "coinranking7c25965daaf1f01f52c37b1a6bcc0563715ace32a6c7d40d";

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
    console.error("Error fetching cryptocurrencies:", error);
    res.status(500).json({ message: "Error fetching data from Coinranking API", error: error.message });
  }
});

app.get("/api/cryptos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.coinranking.com/v2/coin/${id}`, {
      headers: {
        "x-access-token": API_KEY,
      },
    });
    res.json(response.data.data.coin);
  } catch (error) {
    console.error("Error fetching cryptocurrency details:", error);
    res.status(500).json({ message: "Error fetching cryptocurrency details", error: error.message });
  }
});

app.get("/api/cryptos/:id/history", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.coinranking.com/v2/coin/${id}/history`, {
      headers: {
        "x-access-token": API_KEY,
      },
      params: {
        timePeriod: "7d",
      },
    });
    res.json(response.data.data.history);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ message: "Error fetching historical data", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
