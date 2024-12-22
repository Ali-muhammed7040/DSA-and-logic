//stripe backend

// app.js
const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const cors = require("cors");
const app = express();
const port = 3000;

// Replace with your actual Stripe Secret Key
const stripe = Stripe(
  "sk_test_51NRCU1EHOlvr6BcsBWN9qJOtiTxT7ndik9L6iI3P4fBo7eOhMreftQBfu3K1ZCz0mWePSVJOHCduBzfKRIMlMHst00el5MFdrY"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/pay", async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      description: "Sample Charge",
      source: token.id,
    });
    console.log(charge,'charge')

    res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.json({ status: "failure", error });
  }
});
app.listen(port, () => console.log(`Server running on port ${port}!`));

