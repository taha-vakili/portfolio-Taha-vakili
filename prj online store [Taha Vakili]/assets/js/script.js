

let cart = [];
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    document.getElementById('category').addEventListener('change', filterProducts);
    document.getElementById('price-range').addEventListener('input', updatePriceFilter);
});


function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(data);
        });
}


function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.category}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}


function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    cart.push(product);

   
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.title} added to cart`);
}


function filterProducts() {
    const selectedCategory = document.getElementById('category').value;
    const maxPrice = document.getElementById('price-range').value;

    const filteredProducts = allProducts.filter(product => {
       
        const isCategoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const isPriceMatch = product.price <= maxPrice;
        return isCategoryMatch && isPriceMatch;
    });

    displayProducts(filteredProducts);
}



function updatePriceFilter() {
    const maxPrice = document.getElementById('price-range').value;
    document.getElementById('price-value').innerText = `$0 - $${maxPrice}`;
    filterProducts();
}