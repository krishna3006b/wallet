const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {

  const { userAddress, network } = req.query;
  console.log(userAddress,network);

    const tokens = await Moralis.SolApi.account.getSPL({
      network: network,
      address: userAddress,
    });

  // const nfts = await Moralis.SolApi.account.getNFTs({
  //   network: network,
  //   address: userAddress,
  // });

  // const myNfts = nfts.raw.result.map((e, i) => {
  //   if (e?.media?.media_collection?.high?.url && !e.possible_spam && (e?.media?.category !== "video") ) {
  //     return e["media"]["media_collection"]["high"]["url"];
  //   }
  // })

  const balance = await Moralis.SolApi.account.getBalance({
    "network": network,
    "address": userAddress
  });

  const jsonResponse = {
    tokens: tokens.raw,
    nfts: [],
    balance: balance.raw.solana
  }
  console.log(jsonResponse);


  return res.status(200).json(jsonResponse);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
