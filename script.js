// Product Data
const products = [
{ id: 1, name: "Headphones", price: 2999,image:"headphones.jpg"},
{ id: 2, name: "Smart Watch", price: 4999,image:"smartwatch.jpg"},
{ id: 3, name: "Bluetooth Speaker", price: 1999,image:"headphones.jpg"},
{ id: 4, name: "Laptop Bag  ", price: 1499,image:"headphones.jpg"}
];


// LocalStorage Helpers
function getCart() {
return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
localStorage.setItem("cart", JSON.stringify(cart));
}


// Display Products
function displayProducts(list = products) {

const container = document.getElementById("products");
if(!container) return;

container.innerHTML = "";

list.forEach(p => {

container.innerHTML += `
<div class="product">
<img src="${p.image}" alt="${p.name}">
<h4>${p.name}</h4>
<p>₹${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>
`;

});

}


// Search Products
function searchProducts() {

const keyword =
document.getElementById("searchInput").value.toLowerCase();
const filteredProducts = products.filter(p =>
p.name.toLowerCase().includes(keyword)
);

displayProducts(filteredProducts);

}


// Add To Cart
function addToCart(id) {

let cart = getCart();

let product = products.find(p => p.id === id);

let item = cart.find(i => i.id === id);

if(item){
item.qty++;
}
else{
cart.push({...product, qty:1});
}

saveCart(cart);

alert("Added to Cart");

}


// Display Cart
function displayCart(){

const cartItems = document.getElementById("cartItems");
const totalEl = document.getElementById("total");

if(!cartItems) return;

let cart = getCart();

let total = 0;

cartItems.innerHTML = "";

cart.forEach(item => {

total += item.price * item.qty;

cartItems.innerHTML += `
<div class="cart-item">
<h4>${item.name}</h4>
<p>₹${item.price} × ${item.qty}</p>
</div>
`;

});

totalEl.innerText = total;

}


// Checkout Calculation
function checkout(){

const cart = getCart();

const subtotal = cart.reduce(
(sum,item)=>sum + item.price * item.qty ,0
);

const tax = subtotal * 0.18;

const shipping = subtotal > 5000 ? 0 : 100;

const grandTotal = subtotal + tax + shipping;

document.getElementById("subtotal").innerText = subtotal;
document.getElementById("tax").innerText = tax.toFixed(2);
document.getElementById("shipping").innerText = shipping;
document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);

}


// Place Order
function placeOrder(){

alert("Order placed successfully!");

localStorage.removeItem("cart");

window.location.href = "index.html";

}