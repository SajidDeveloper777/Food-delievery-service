var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#previous",
  },
});


const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue= document.querySelector('.cart-value');
const hamburger =document.querySelector('.hamburger');
const mobileManu = document.querySelector('.mobile-manu');
const icon = document.querySelector('.hamburger i');

hamburger.addEventListener('click',()=> mobileManu.classList.toggle('mobile-manu-active'));


hamburger.addEventListener('click', (e) => {
    e.preventDefault(); // prevent page jump if it's an <a>

    // Swap between bars and xmark
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});





cartIcon.addEventListener('click', (e) => {
  cartTab.classList.add('cart-active')
  e.preventDefault();
});
closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-active'));

let productList = [];
let cartProduct =[];


const updateTotal = () =>{

    let totalPrice=0;
    let totalQuantity =0;



document.querySelectorAll('.item').forEach(item=>{

const itemPrice=parseFloat(item.querySelector('.total-price').textContent.replace('$',''));
const cartPrice=parseInt(item.querySelector('.quantity-value').textContent);
totalPrice += itemPrice;

totalQuantity+=cartPrice;

});
cartTotal.textContent=`$${totalPrice.toFixed(2)}`;
cartValue.textContent=totalQuantity;


}


const showCard = () => {

  productList.forEach(product => {
    const oderCard = document.createElement('div');
    oderCard.classList.add('card-order');

    oderCard.innerHTML = `

  <div class="card-image">
      <img src="${product.image}" alt="loading error">
  </div>
       <h4>
        ${product.name}
       </h4>
       <h4 class="price">
        ${product.price}
       </h4>
      <a href="#" class="btn card-btn">Add to cart</a>
`;
    cardList.appendChild(oderCard);

    cardBtn=oderCard.querySelector('.card-btn')

    cardBtn.addEventListener('click', (e) =>{

      e.preventDefault();

    addTocart(product);
    })

  })

}

const addTocart = (product) =>{


  const existingProduct=cartProduct.find(item => item.id==product.id);
  if (existingProduct){
    alert("Item already in your cart");
    return;
  }
  else
  cartProduct.push(product);

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML = `
    <div class="item-image">
      <img src="${product.image}" alt="">
      </div>

    <div class="detail">
       <h4>
       ${product.name}
      </h4>

      <h4 class="total-price">${product.price}</h4>
      </div>

    <div class="flex gap">
       <a href="#" class="quantity-btn minus">
       <i class="fa-solid fa-minus"></i>
        </a>
       <h4 class="quantity-value">1</h4>
      <a href="#" class="quantity-btn plus">
      <i class="fa-solid fa-plus"></i>
        </a>

       </div>  
  `;
  cartList.appendChild(cartItem);
  updateTotal();



  let quantity=1;
  let price = parseFloat(product.price.replace('$',''))
  
   //quantity increasing code
  const quantityValue=cartItem.querySelector('.quantity-value');
  const plusBtn=cartItem.querySelector('.plus');
  const itemTotal=cartItem.querySelector('.total-price');
  const minusBtn=cartItem.querySelector('.minus');


  plusBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    quantity++;
    quantityValue.textContent=quantity;
    itemTotal.textContent=`$${(price*quantity).toFixed(2)}`;
    updateTotal();



  })


   //quantity decreasing code

  minusBtn.addEventListener('click',(e) =>{
    e.preventDefault();

    if(quantity>1){
    quantity--;
    quantityValue.textContent=quantity;
    itemTotal.textContent=`$${(price*quantity).toFixed(2)}`;
    updateTotal();


    }
    else{
    cartItem.classList.add('slide-out');
    setTimeout(()=>{
      cartItem.remove();
      cartProduct=cartProduct.filter(item=> item.id !== product.id);
    updateTotal();


    }, 300)
      
    }
    

  })






}


  










const appInit = () => {
  fetch('product.json').then(Response => Response.json())
    .then(data => {
      productList = data;
      showCard();

    })
}

appInit();
                       
