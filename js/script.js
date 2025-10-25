// Simulated cart array to track selected items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(courseTitle) {
  cart.push(courseTitle);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`"${courseTitle}" has been added to your cart.`);
}

function updateCartCount() {
  const count = cart.length;
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

// Call this on each page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Dashboard demo logic
  if (document.getElementById("dashboard-stats")) {
    document.getElementById("total-items").textContent = cart.length;
    document.getElementById("recent-course").textContent = cart[cart.length - 1] || "No recent course";
  }

  // Form validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
});

// Optional: clear cart after checkout
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    alert("Cart cleared.");
    location.reload();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const productId = this.getAttribute('data-id');

      fetch('php/cart_logic.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', product_id: productId })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Added to cart');
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong');
      });
    });
  });
});
  // Sample product recommendations (You can customize this based on cart content)
  const allRecommendations = [
    { name: "Python Programming", category: "ICT" },
    { name: "Fish Feed Production", category: "Fisheries" },
    { name: "MTN 4G LTE Modem", category: "Essentials" },
    { name: "AI Fundamentals", category: "ICT" },
    { name: "Canon Student Desk Printer", category: "Accessories" },
  ];

  function showRecommendations() {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    const hasSeenRecommendations = sessionStorage.getItem("recommendShown");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Only show to returning logged-in users who have items in cart and haven't seen it this session
    if (isLoggedIn && cart.length > 0 && !hasSeenRecommendations) {
      const box = document.getElementById("recommendBox");
      const list = document.getElementById("recommendList");

      // Filter products not already in cart
      const recommended = allRecommendations.filter(item =>
        !cart.some(cartItem => cartItem.name === item.name)
      ).slice(0, 3); // Limit to 3 items

      // Populate box
      list.innerHTML = recommended.map(item => `<li>${item.name} (${item.category})</li>`).join("");

      if (recommended.length > 0) {
        box.style.display = "block";
        sessionStorage.setItem("recommendShown", "true"); // So it doesn't show again this session

        // Auto-fade after 6 seconds
        setTimeout(() => {
          box.style.transition = "opacity 1s ease";
          box.style.opacity = "0";
          setTimeout(() => box.style.display = "none", 1000);
        }, 6000);
      }
    }
  }

  // Run when DOM is ready
  document.addEventListener("DOMContentLoaded", showRecommendations);

