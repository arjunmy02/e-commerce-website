console.log("script.js loaded");

let cartCount = localStorage.getItem("cartCount");

if (cartCount === null) {
    cartCount = 0;
} else {
    cartCount = Number(cartCount);
}

console.log("Homepage cartCount:", cartCount);

const cartButton = document.querySelector(".cart-btn");

cartButton.addEventListener("click", function () {
    window.location.href = "cart.html";
});

cartButton.textContent = "Cart (" + cartCount + ")";

window.addEventListener("pageshow", function () {

    let latestCount =
        Number(localStorage.getItem("cartCount")) || 0;

    cartButton.textContent =
        "Cart (" + latestCount + ")";

});

const addToCartButtons = document.querySelectorAll(
    ".add-to-cart, .feature-button, .common-button"
);

for (let i = 0; i < addToCartButtons.length; i++) {

    addToCartButtons[i].addEventListener("click", function() {
        

        cartCount++;


        cartButton.textContent = "Cart (" + cartCount + ")";

        localStorage.setItem("cartCount", cartCount);

        let card = this.parentElement;

        let productName = card.querySelector("h2, h3").textContent;
        let productPrice = card.querySelector("p").textContent;

        let productImage=card.querySelector("img").src;

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        cartItems.push({
            name: productName,
            price: productPrice,
            image:productImage
        });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    });

};

let buynowbuttons=document.querySelectorAll(".buynow");
console.log(buynowbuttons.length);
for(let i=0;i<buynowbuttons.length;i++){
    buynowbuttons[i].addEventListener("click",function(){
        let card = this.parentElement;

        let productName = card.querySelector("h2, h3").textContent;
        let productPrice = card.querySelector("p").textContent;

        let productImage=card.querySelector("img").src;

        let buynowItem = {
        name: productName,
        price: productPrice,
        image: productImage
        };
        localStorage.setItem(
            "buynowItem",
            JSON.stringify(buynowItem)
        );  
        window.location.href = "checkout.html";


    });
}
async function loadProducts() {

    try {

        const response = await fetch(
            "http://localhost:8089/api/products"
        );

        const products = await response.json();

        const container =
            document.getElementById("products-container");
            // if (!container) {
            //     return;
            // }

        container.innerHTML = "";

        products.forEach(product => {

            container.innerHTML += `
                <div class="product-card">
                 <img src="${product.imageUrl}" alt="${product.name}">

                    <h3>${product.name}</h3>

                    <p><strong>Price:</strong> ₹${product.price}</p>

                    <button class="add-to-cart">Add To Cart</button>

                    <button class="buynow">Buy Now</button>

                </div>
            `;

        });
        const addToCartButtons =
        document.querySelectorAll(".add-to-cart");

        addToCartButtons.forEach(button => {

            button.addEventListener("click", function () {
                let card = this.parentElement;

                let productName =
                    card.querySelector("h3").textContent;

                let productPrice =
                    card.querySelector("p").textContent;

                let productImage =
                    card.querySelector("img").src;

                let cartItems =
                    JSON.parse(localStorage.getItem("cartItems")) || [];

                cartItems.push({
                    name: productName,
                    price: productPrice,
                    image: productImage
                });

                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(cartItems)
                );
               

                cartCount++;

                cartButton.textContent =
                "Cart (" + cartCount + ")";

                localStorage.setItem("cartCount",cartCount);

            });

        });

        const buynowbuttons =
        document.querySelectorAll(".buynow");

        buynowbuttons.forEach(button => {

            button.addEventListener("click", function () {

                let card = this.parentElement;

                let productName =  card.querySelector("h3").textContent;

                let productPrice =card.querySelector("p").textContent;

                let productImage =card.querySelector("img").src;

                let buynowItem = {
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

                localStorage.setItem("buynowItem",JSON.stringify(buynowItem));

                window.location.href = "checkout.html";
            });

        });

    } catch (error) {

        console.log("Error:", error);

    }
}

loadProducts();

const searchInput = document.querySelector(".search-input");


const productCards = document.querySelectorAll(".product-card");


searchInput.addEventListener("input", function () {

    
    let searchText = searchInput.value.toLowerCase();

    
    for (let i = 0; i < productCards.length; i++) {

        
        let productName = productCards[i]
            .querySelector("h3")
            .textContent
            .toLowerCase();

        
        if (productName.includes(searchText)) {

            // Show matching product
            productCards[i].style.display = "block";

        } else {

            // Hide non-matching product
            productCards[i].style.display = "none";

        }
    }
});

