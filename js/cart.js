document.addEventListener("DOMContentLoaded", () => {    

    
    const cartEmptyDisp = document.querySelector('#cart__empty');
    let cartTotalItems = CartManager.getTotalItems();
    if (cartTotalItems < 1) {
        cartEmptyDisp.classList.remove('d--none');
    }else{
        cartEmptyDisp.classList.add('d--none');
    };

    

    const itemsInfo = CartManager.getItemsInfo();     
    renderCartAssortment(CartManager.getItemsInfo());

    function renderCartAssortment(mockCartTemplate) {   
        const cartTemplate = document.querySelector('#cartTemplate');      
        mockCartTemplate.forEach((item) => {     
            const itemTemplate = cartTemplate.content.cloneNode(true); 
            itemTemplate.querySelector('.cart__item__article').textContent = item.article;
            itemTemplate.querySelector('.cart__item__name').textContent = item.name;
            itemTemplate.querySelector('img').setAttribute('src', item.img);
            itemTemplate.querySelector('img').setAttribute('alt', item.name);
            itemTemplate.querySelector('.cart__item__add__quantity').textContent = CartManager.getTotalItemsPerProduct(item.id);

            const itmCart = itemTemplate.querySelector('.cart__item');
            const itmCount = itemTemplate.querySelector('.cart__item__add__quantity');
            const btnMinus = itemTemplate.querySelector('.assortment__item--minus');
            const btnPlus = itemTemplate.querySelector('.assortment__item--plus');

            let count = CartManager.getTotalItemsPerProduct(item.id);
            let quantityBorder = 1;

            if (btnPlus) {
                btnPlus.addEventListener('click', (e) => {
                    CartManager.quantityPlus(item.id);
                    count = CartManager.getTotalItemsPerProduct(item.id);
                    itmCount.innerHTML = count;     
                });
            }

            if (btnMinus) {
                btnMinus.addEventListener('click', (e) => {
                    if (count > quantityBorder) {
                        CartManager.quantityMinus(item.id);
                        count = CartManager.getTotalItemsPerProduct(item.id);
                        itmCount.innerHTML = count;
                    }else{                    
                        CartManager.removeFromCart(item.id);
                        location.reload();
                    }                
                });
            }
            document.querySelector('.cart__items').append(itemTemplate)
        });
    }  
});