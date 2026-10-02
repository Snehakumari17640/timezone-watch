let cart = [];

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value.toLowerCase();

  productCards.forEach(function (card) {
    let name = card.getAttribute("data-name").toLowerCase();

    if (name.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

function addToCart(name, price) {
  let existingProduct = cart.find(function (item) {
    return item.name === name;
  });

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCart();
  showNotification();
}

function updateCart() {
  let cartItems = document.getElementById("cartItems");
  let cartCount = document.getElementById("cartCount");
  let cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(function (item, index) {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price}</p>
                </div>

                <div class="quantity">
                    <button onclick="decreaseQuantity(${index})">−</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
  });

  cartCount.innerText = totalItems;
  cartTotal.innerText = totalPrice;
}

function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function openCart() {
  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function showNotification() {
  let notification = document.getElementById("notification");

  notification.style.display = "block";

  setTimeout(function () {
    notification.style.display = "none";
  }, 1500);
}

function submitForm(event) {
  event.preventDefault();

  alert("Thank you! Your message has been submitted.");
  event.target.reset();
}

window.onclick = function (event) {
  let modal = document.getElementById("cartModal");

  if (event.target === modal) {
    closeCart();
  }
};
