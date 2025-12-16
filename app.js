const API = "http://localhost:5000/api";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

// Load Products
if (document.getElementById("products")) {
  fetch(API + "/products")
    .then(res => res.json())
    .then(data => {
      document.getElementById("products").innerHTML =
        data.map(p => `
          <div class="card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
          </div>
        `).join("");
    });
}

// Cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

if (document.getElementById("cart")) {
  document.getElementById("cart").innerHTML =
    cart.map(p => `<p>${p.name} - ₹${p.price}</p>`).join("");
}

// Address
function addAddress() {
  const a = document.getElementById("address").value;
  addresses.push(a);
  localStorage.setItem("addresses", JSON.stringify(addresses));
  document.getElementById("addressList").innerHTML =
    addresses.map(x => `<li>${x}</li>`).join("");
}

// Razorpay
async function payNow() {
  const total = cart.reduce((s, p) => s + p.price, 0);
  const order = await fetch(API + "/orders", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ amount: total })
  }).then(r => r.json());

  const options = {
    key: "RAZORPAY_KEY_ID",
    amount: order.amount * 100,
    currency: "INR",
    name: "Unimax Agro Chemicals",
    order_id: order.id,
    handler: function (res) {
      alert("Payment Successful");
      localStorage.clear();
    }
  };

  new Razorpay(options).open();
}
