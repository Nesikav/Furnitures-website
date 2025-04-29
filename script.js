const products = [
  {
    name: "Fabulous Kids Sofa",
    price: "₹1582 (10% off)",
    images: ["img1.jpg", "img11.avif","img12.avif"],
    desc: "Soft, safe, and colorful kids sofa perfect for playrooms and bedrooms."
  },
  {
    name: "Elegant Bookcase",
    price: "₹3431 (6% off)",
    images: ["img2.avif"],
    desc: "A sleek bookcase to organize and decorate your favorite reading corner."
  },
  {
    name: "Dining Table",
    price: "₹12500 (15% off)",
    images: ["img3.jpg"],
    desc: "Sturdy and stylish dining table, ideal for family meals and gatherings."
  },
  {
    name: "Coffee Table",
    price: "₹3800 (12% off)",
    images: ["img4.avif"],
    desc: "Modern coffee table to complement your living room setup beautifully."
  },
  {
    name: "TV Stand",
    price: "₹4800 (12% off)",
    images: ["img5.avif"],
    desc: "Functional and elegant TV unit with ample storage space."
  },
  {
    name: "Dresser Table",
    price: "₹5800 (12% off)",
    images: ["img6.avif"],
    desc: "Spacious dresser table with mirror and drawer compartments."
  },
  {
    name: "Chair",
    price: "₹1800 (12% off)",
    images: ["img7.jpg"],
    desc: "Comfortable and elegant accent chair perfect for any room."
  },
  {
    name: "Bed",
    price: "₹8800 (12% off)",
    images: ["img8.jpg"],
    desc: "Stylish bed with a sturdy frame for a good night's sleep."
  },
  {
    name: "Cushion Chair",
    price: "₹3800 (12% off)",
    images: ["img9.avif"],
    desc: "Luxurious cushioned chair for relaxing in your reading nook."
  },
  {
    name: "Foldable Cot",
    price: "₹13800 (12% off)",
    images: ["img10.avif"],
    desc: "Space-saving foldable cot ideal for guests and compact rooms."
  }
];

// DOM references
const productContainer = document.getElementById("product-container");
const detailSection = document.getElementById("product-detail");

// Display all products
function displayProducts(productsToShow) {
  productContainer.innerHTML = "";
  productsToShow.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.price}</p>
    `;
    div.addEventListener("click", () => showDetail(product));
    productContainer.appendChild(div);
  });
}

displayProducts(products);

// Image navigation
let currentImageIndex = 0;
let currentImages = [];

function showDetail(product) {
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-price").textContent = product.price;
  document.getElementById("detail-description").textContent = product.desc;

  currentImages = product.images || [product.images[0]];
  currentImageIndex = 0;
  document.getElementById("detail-image").src = currentImages[currentImageIndex];

  productContainer.style.display = "none";
  detailSection.style.display = "block";
  setTimeout(() => detailSection.classList.add("show"), 50);
}

// Arrow buttons
document.getElementById("prev-image").addEventListener("click", () => {
  if (currentImages.length > 0) {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById("detail-image").src = currentImages[currentImageIndex];
  }
});

document.getElementById("next-image").addEventListener("click", () => {
  if (currentImages.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    document.getElementById("detail-image").src = currentImages[currentImageIndex];
  }
});

// Close detail view
document.getElementById("close-detail").addEventListener("click", () => {
  detailSection.classList.remove("show");
  setTimeout(() => {
    detailSection.style.display = "none";
    productContainer.style.display = "flex";
  }, 500);
});

// Search product
function searchProduct() {
  const searchText = document.getElementById("search-box").value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchText)
  );
  productContainer.innerHTML = filtered.length === 0
    ? "<p>No matching products found.</p>"
    : displayProducts(filtered);
}

// Add to cart
function addToCart() {
  const item = {
    name: document.getElementById('detail-name').textContent,
    price: parseFloat(document.getElementById('detail-price').textContent.replace("₹", "")),
    description: document.getElementById('detail-description').textContent,
    image: document.getElementById('detail-image').src
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

updateCartCount();

// Buy now
function goToBuy() {
  window.location.href = "buy.html";
}

// Sign In / Up Modal
function openSignInModal() {
  document.getElementById("signin-modal").style.display = "block";
}
function closeSignInModal() {
  document.getElementById("signin-modal").style.display = "none";
}
function openSignUpModal() {
  document.getElementById("signup-modal").style.display = "block";
}
function closeSignUpModal() {
  document.getElementById("signup-modal").style.display = "none";
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target === document.getElementById("signin-modal")) closeSignInModal();
  if (event.target === document.getElementById("signup-modal")) closeSignUpModal();
};

// Checkout form
document.getElementById("checkout-form")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    orderDetails: document.getElementById("orderDetails").value
  };

  fetch("https://backend-1-msp7.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Email sent successfully!");
    } else {
      alert("❌ Failed to send email.");
    }
  });
});

