let currentSlide = 0; // Keep track of the current slide index

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel .img-container');
    const totalSlides = slides.length;

    // Update the currentSlide index
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Move the carousel by adjusting the transform property
    const carousel = document.querySelector('.carousel');
    const slideWidth = slides[0].offsetWidth;  // Get the width of a single image
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    popup.style.display = 'none';
    overlay.style.display = 'none';

    // Redirect to products.html
    window.location.href = 'products.html';
}
   // Function to add items to the cart
   function addToCart(productName, price) {
    // Retrieve cart from local storage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    // Save updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}
let cart = [];
let totalPrice = 0;

function addToCart(productName, productPrice, quantityInputId) {
    // Get the quantity value from the input field
    const quantity = document.getElementById(quantityInputId).value;
    const itemTotal = productPrice * quantity;

    // Add the product to the cart array
    cart.push({ name: productName, price: productPrice, quantity: quantity, total: itemTotal });

    // Update the total price
    totalPrice += itemTotal;

    // Update the cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the cart display
    cartItemsContainer.innerHTML = '';

    // Re-render the cart items
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${item.name} (x${item.quantity})</span><span>₱${item.total.toFixed(2)}</span>`;
        cartItemsContainer.appendChild(listItem);
    });

    // Calculate total price
    totalPrice = cart.reduce((total, item) => total + item.total, 0);

    // Update total price
    totalPriceElement.textContent = `Total: ₱${totalPrice.toFixed(2)}`;
}
