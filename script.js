const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartItems = [];

// Cart container
const cartContainer = document.createElement('div');
cartContainer.id = 'cart-container';
cartContainer.style.position = 'fixed';
cartContainer.style.top = '80px';
cartContainer.style.right = '20px';
cartContainer.style.backgroundColor = '#fff';
cartContainer.style.border = '1px solid #ccc';
cartContainer.style.padding = '10px';
cartContainer.style.width = '250px';
cartContainer.style.maxHeight = '400px';
cartContainer.style.overflowY = 'auto';
cartContainer.style.zIndex = '999';
document.body.appendChild(cartContainer);

const totalElement = document.createElement('div');
totalElement.id = 'total';
totalElement.style.fontWeight = 'bold';
cartContainer.appendChild(totalElement);

// Checkout button
const checkoutBtn = document.createElement('button');
checkoutBtn.textContent = 'Checkout';
checkoutBtn.style.width = '100%';
checkoutBtn.style.marginTop = '10px';
checkoutBtn.style.padding = '8px';
checkoutBtn.style.border = 'none';
checkoutBtn.style.borderRadius = '8px';
checkoutBtn.style.backgroundColor = '#28a745';
checkoutBtn.style.color = '#fff';
checkoutBtn.style.fontWeight = 'bold';
checkoutBtn.style.cursor = 'pointer';
checkoutBtn.addEventListener('click', () => {
  if(cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  let summary = 'Cart Summary:\n';
  let total = 0;
  cartItems.forEach(item => {
    summary += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    total += item.price * item.quantity;
  });
  summary += `\nTotal: $${total.toFixed(2)}`;
  alert(summary);
  cartItems = []; // clear cart after checkout
  updateCart();
});
cartContainer.appendChild(checkoutBtn);

// Update cart display with + / − buttons
function updateCart() {
  // remove all items except total and checkout
  cartContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.style.display = 'flex';
    itemElement.style.justifyContent = 'space-between';
    itemElement.style.alignItems = 'center';
    itemElement.style.marginBottom = '5px';

    const namePrice = document.createElement('span');
    namePrice.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;

    // + button
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.style.marginLeft = '5px';
    plusBtn.addEventListener('click', () => {
      item.quantity++;
      updateCart();
    });

    // − button
    const minusBtn = document.createElement('button');
    minusBtn.textContent = '−';
    minusBtn.style.marginLeft = '3px';
    minusBtn.addEventListener('click', () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cartItems = cartItems.filter(i => i.name !== item.name);
      }
      updateCart();
    });

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '3px';
    removeBtn.addEventListener('click', () => {
      cartItems = cartItems.filter(i => i.name !== item.name);
      updateCart();
    });

    itemElement.appendChild(namePrice);
    itemElement.appendChild(plusBtn);
    itemElement.appendChild(minusBtn);
    itemElement.appendChild(removeBtn);

    cartContainer.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  cartContainer.appendChild(totalElement);
  cartContainer.appendChild(checkoutBtn); // keep checkout at bottom
}

// Add to Cart click
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const card = e.target.closest('.card');
    const name = card.querySelector('.card-title').textContent;
    const price = parseFloat(card.querySelector('.card-text').textContent.replace('$',''));

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({name, price, quantity:1});
    }

    updateCart();
  });
});
