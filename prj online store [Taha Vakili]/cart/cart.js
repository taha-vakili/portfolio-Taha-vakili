document.addEventListener('DOMContentLoaded',()=>{
    displayCartItems();
});

function displayCartItems(){
    const cartItems=JSON.parse(localStorage.getItem('cart'))|| [];
    const cartProductsContainer=document.getElementById('cart-products');
    const totalPriceElement =document.getElementById('total')

    let total=0;
    cartProductsContainer.innerHTML='';

    cartItems.forEach(item => {
        const productElement=document.createElement('div')
        productElement.classList.add('product');
        productElement.innerHTML=`
           <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.category}</p>
            <p>$${item.price}</p>`;

            cartProductsContainer.append(productElement);
            total+=item.price;
    });
    totalPriceElement.innerText=total.toFixed(2);
}