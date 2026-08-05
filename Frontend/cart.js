
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let cartContainer = document.getElementById("cart-items");

let total = 0;

for(let i = 0; i < cartItems.length; i++){

    cartContainer.innerHTML += `
        <div class="cart-item">

            <img src="${cartItems[i].image}">
            <h3>${cartItems[i].name}</h3>
            <p>${cartItems[i].price}</p>
            
            

            <button class="remove-btn">
                Remove
            </button>
        </div>
    `;

    let price = cartItems[i].price;

    price = price.replace("₹", "");
    price = price.replace(/,/g, "");

    total = total + Number(price);
}

document.getElementById("total-price").textContent =
    "Total: ₹" + total.toLocaleString();

let removeButtons = document.querySelectorAll(".remove-btn");

for(let i = 0; i < removeButtons.length; i++){

    removeButtons[i].addEventListener("click", function(){

        console.log("Add To Cart Clicked");

        cartItems.splice(i, 1);

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

        let cartCount =
            Number(localStorage.getItem("cartCount")) || 0;

        if(cartCount > 0){
            cartCount--;
        }

        localStorage.setItem("cartCount", cartCount);

        location.reload();

    });

}
let clearCartButton = document.getElementById("clear-cart");

clearCartButton.addEventListener("click", function(){

    localStorage.removeItem("cartItems");
    localStorage.setItem("cartCount", 0);

    location.reload();

});
let cartCount =
    Number(localStorage.getItem("cartCount")) || 0;

let cartButton =
    document.querySelector(".index-cart-btn");

cartButton.textContent =
    "Cart (" + cartCount + ")";