const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "RAZORPAY_KEY_ID",
  key_secret: "RAZORPAY_KEY_SECRET"
});

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.post("/api/orders", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR"
  });

  db.query(
    "INSERT INTO orders (razorpay_order_id, amount, status) VALUES (?, ?, ?)",
    [order.id, req.body.amount, "CREATED"]
  );

  res.json(order);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
