
// ----------- BANNER --------------//

var bannerStatus = 1;
var bannerTimer = 4000;


window.onload = function() {
    bannerLoop();
}

var startBannerLoop = setInterval(function(){
    bannerLoop();
}, bannerTimer);
 
function bannerLoop() {
    if (bannerStatus === 1) {
        document.getElementById("imgban2").style.opacity = "0";

        setTimeout(function(){
            document.getElementById("imgban1").style.right = "0px";
            document.getElementById("imgban1").style.zIndex = "1000";
            document.getElementById("imgban2").style.right = "-100vw";
            document.getElementById("imgban2").style.zIndex = "1500";
            document.getElementById("imgban3").style.right = "100vw";
            document.getElementById("imgban3").style.zIndex = "500";
        }, 500);

        setTimeout(function(){
            document.getElementById("imgban2").style.opacity = "1";
        }, 1000);

        bannerStatus = 2;
    }
    else if (bannerStatus === 2) {
        document.getElementById("imgban3").style.opacity = "0";

        setTimeout(function(){
            document.getElementById("imgban2").style.right = "0px";
            document.getElementById("imgban2").style.zIndex = "1000";
            document.getElementById("imgban3").style.right = "-100vw";
            document.getElementById("imgban3").style.zIndex = "1500";
            document.getElementById("imgban1").style.right = "100vw";
            document.getElementById("imgban1").style.zIndex = "500";
        }, 500);

        setTimeout(function(){
            document.getElementById("imgban3").style.opacity = "1";
        }, 1000);

        bannerStatus = 3;
    }
    else if (bannerStatus === 3) {
        document.getElementById("imgban1").style.opacity = "0";

        setTimeout(function(){
            document.getElementById("imgban3").style.right = "0px";
            document.getElementById("imgban3").style.zIndex = "1000";
            document.getElementById("imgban1").style.right = "-100vw";
            document.getElementById("imgban1").style.zIndex = "1500";
            document.getElementById("imgban2").style.right = "100vw";
            document.getElementById("imgban2").style.zIndex = "500";
        }, 500);

        setTimeout(function(){
            document.getElementById("imgban1").style.opacity = "1";
        }, 1000);

        bannerStatus = 1;
    }
}




// ------------------  NAVBAR COLOR CHANGE  -------//

const navbar = document.querySelector('.navbar');

window.onscroll = () => {
    if (window.scrollY > 300) {
        navbar.classList.add('nav--scrolled');
    } else {
        navbar.classList.remove('nav--scrolled');
    }
};




// ------------------------  SEARCH FORM  --------//


const searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    cart.classList.remove('active');
}





// ----------------  CART FUNCTIONALITY  -------------//

const cart = document.querySelector('.cart');
const cartSign = document.querySelector('.fa-cart-arrow-down')

cartSign.onclick = () => {
    cart.classList.toggle('active');
    cartSign.classList.remove('added-el')
    searchForm.classList.remove('active');
}

document.querySelector('#hide').onclick = () => {
    cart.classList.remove('active')
}




// ---------  CHOOSING SIZE OF THE SHOP-ITEM
const lList = document.querySelectorAll('.option');


function removeStyle(){
    lList.forEach(element => {
        if(element.classList.contains('active-li')){
            element.classList.remove('active-li');
        }

        
    });
};


for (var i = 0; i < lList.length; i++) {
    lList[i].addEventListener("mousedown", function clickFn(e){
        removeStyle();
        this.classList.add("active-li");
    });  
}










// ------------  ADDING SHOP-ITEM IN THE CART
window.addEventListener('mousedown',function(e){
    if(e.target.hasAttribute('data-cart')){
        
        const card = e.target.closest('.shop-item');
        const cartWrapper = document.querySelector('.cart-items-container');
        const btn = card.querySelector('.shop-item-btn');


        // LIST OF DATA NEEDED FOR FURTHER TRANSFER TO THE CART
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.productimg').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            price: card.querySelector('.item-price').innerText,
            size: card.querySelector('.active-li').innerText,
        };
        
        // AVOIDIN 'NULL' STATEMENT FOR ID CHECK OF THE CART 
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        const sameSizeP = cartWrapper.querySelector('p.same-size');
        let sameSize = null;
        if (sameSizeP != null){
            sameSize = sameSizeP.innerHTML;
        }
        
        // ITEM ADDING LOGIC
        if(itemInCart && sameSize === productInfo.size){
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) +1;
        }else{
            
            const cartItemHTML = 
            `
            <div class="cart-item" data-id="${productInfo.id}">
            <span class="fas fa-times delete" id="delete"></span>
            <img src="${productInfo.imgSrc}" alt="">
            <div class="content">
            <h3>${productInfo.title}</h3>
            <div class="price">${productInfo.price}</div>
            <p class="same-size">${productInfo.size}</p>
            </div>
            <div class="counter">
            <div class="items-control" data-action="minus">-</div>
            <div class="items-current" data-counter="">1</div>
            <div class="items-control" data-action="plus">+</div>
            </div>
            </div>`;
            cartWrapper.insertAdjacentHTML('afterbegin', cartItemHTML);
            
            btn.onclick = () => {
                cartSign.classList.add('added-el');

                const delBtn = document.querySelector('#delete');
                delBtn.onclick = () => {
                    if(confirm('Are You Sure About That?')){
                        delBtn.parentElement.remove();
                    }
                }
            }
        }
        calcCartPrice()
        
    };  
});
        



        
// -------  COUNTER INCREMENTAL LOGIC 
window.addEventListener('click' ,function(event){

    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus'){
        const counterWrapper = event.target.closest('.counter');
        counter = counterWrapper.querySelector('[data-counter]');
    };

    if (event.target.dataset.action === 'plus'){
        counter.innerText = ++counter.innerText;   
    }

    if (event.target.dataset.action === 'minus'){
            if (parseInt(counter.innerText) > 1){
            counter.innerText = --counter.innerText;
        };
    }
    calcCartPrice()
        
});





// --------  OVERALL PRICE CALCULATOR
function calcCartPrice() {
    const cartWrapper = document.querySelector('.cart-items-container');
	const priceElements = cartWrapper.querySelectorAll('.price');
	const totalPriceEl = document.querySelector('.total-price');

	let priceTotal = 0;
	
	priceElements.forEach(function (item) {
		const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
		priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
	});
	totalPriceEl.innerText = priceTotal;
};

	





        
        







