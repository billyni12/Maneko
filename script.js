let cart = [];

function getFormattedDate() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2); // Últimos 2 dígitos del año
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
    const day = String(now.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const hours = String(now.getHours()).padStart(2, '0'); // Hora con 2 dígitos
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutos con 2 dígitos
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Segundos con 2 dígitos
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
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

function generateOrder() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 297]
    });

    const clientName = document.getElementById('client-name').value;
    const clientId = document.getElementById('client-id').value;
    const clientPhone = document.getElementById('client-phone').value;

    if (!clientName || !clientId || !clientPhone) {
        alert('Por favor, complete los datos del cliente.');
        return;
    }

    doc.setFontSize(12);
    doc.text(`Importadora Maneko`, 20, 5);
    doc.setFontSize(10);
    doc.text(`Orden de Compra ${getFormattedDate()}`, 5, 12);
    doc.text(`Cliente: ${clientName}`, 5, 18);
    doc.text(`DNI: ${clientId}`, 5, 24);
    doc.text(`Celular: ${clientPhone}`, 5, 30);

    let y = 40;
    doc.setFontSize(10);
    cart.forEach((product, index) => {
        doc.text(`${index + 1}. ${product.name} - ${product.detail}`, 5, y);
        doc.text(`S/.${product.price.toFixed(2)} x ${product.quantity} = S/.${(product.price * product.quantity).toFixed(2)}`, 35, y + 4);
        y += 9;
    });

    const totalAmount = document.getElementById('total-amount').textContent;
    doc.setFontSize(12);
    doc.text(`Total: S/.${totalAmount}`, 37, y + 6);

    y += 20;
    doc.setFontSize(8);
    doc.text('Enviar esta orden de compra al siguiente enlace:', 5, y);
    y += 6;
    doc.setTextColor(0, 0, 255);
    doc.textWithLink('Haz click para enviar', 5, y, {
        url: `https://wa.me/51910010500?text=${encodeURIComponent('¡Hola! Aquí está mi orden de compra.')}`
    });
    const fileName = `orden_de_compra_${getFormattedDate()}.pdf`;
    doc.save(fileName);
}
