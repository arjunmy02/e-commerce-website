
let placeOrderButton=document.getElementById("place-order");

placeOrderButton.addEventListener("click",function(){

  localStorage.removeItem("cartItems");
  localStorage.removeItem("cartCount",0);

  window.location.href="success.html";

});
console.log("checkout.js loaded");



let buynowItem =
    JSON.parse(localStorage.getItem("buynowItem"));

console.log(buynowItem);

let container=document.getElementById("buy-now-product");

  container.innerHTML+=`
  
   <div class="buynowTtem">

            <img src="${buynowItem.image}">
            <h3>${buynowItem.name}</h3>
            <p>${buynowItem.price}</p>
            </div>


`;