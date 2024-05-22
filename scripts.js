let cart = [];

function addToCart() {
    const name = document.getElementById('product-name').value;
    const detail = document.getElementById('product-detail').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);

    if (name && detail && price && quantity) {
        const product = { name, detail, price, quantity };
        cart.push(product);
        updateCart();
        clearForm();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function updateCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';

    let totalAmount = 0;

    cart.forEach((product, index) => {
        const total = product.price * product.quantity;
        totalAmount += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.detail}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${total.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-detail').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '';
}
