const CartManager = {
    // Ключ для хранения в localStorage
    storageKey: 'shoppingCart',

    // Получить корзину из localStorage
    getCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart ? JSON.parse(cart) : [];
    },

    // Сохранить корзину в localStorage
    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    },
    
    // Добавить товар в корзину
    addToCart(productId) {
        const cart = this.getCart();
        let existingItem = cart.find(item => item.id === productId);
        if (!existingItem) {
            cart.push(
            {
                id: productId,
                quantity: 1
            }
            );
            this.saveCart(cart);
            return 1;
        }else{
            this.getTotalItemsPerProduct(productId);
        };        
    },

    getItemIds() {
        const cart = this.getCart();
        let ids = cart.map(item => item.id);
        return ids;
    },

    getItemsInfo() {
        const cartIds = this.getItemIds();
        const allItems = itemData.filter(item => cartIds.includes(item.id));
        return allItems;
    },

    // Увеличить кол-во по одной товарной позиции на одну штуку
    quantityPlus(productId) {
        let cart = this.getCart();
        let existingItem = cart.find(item => item.id === productId);
        existingItem.quantity += 1;
        this.saveCart(cart);
    },

    // Уменьшить кол-во по одной товарной позиции на одну штуку
    quantityMinus(productId) {
        let cart = this.getCart();
        let existingItem = cart.find(item => item.id === productId);
        existingItem.quantity -= 1;
        this.saveCart(cart);
    },
    
    //Убрать товарную позицию из localstorage
    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    },
    
    //Получение кол-ва по товарной позиции из localstorage
    getTotalItemsPerProduct(productId) {
        try{
            let cart = this.getCart();
            if (!cart){
                return 1;
            }else{
                let existingItem = cart.find(item => item.id === productId);
                return existingItem?.quantity || 0;
            };
        } catch (error) {
            console.error('Ошибка при получении количества:', error);
            return 1;
        }      
    },

    // Получить общее количество товаров
    getTotalItems() {
        let cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    },
    
    /*
    // Получить детальную информацию о корзине с данными товаров
    getDetailedCart(productId) {
        let cart = this.getCart();        
        
    },
    
    // Получить общую сумму корзины
    getTotal() {
        const detailedCart = this.getDetailedCart();
        return detailedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
       
    // Обновить счетчик на иконке корзины
    updateCartCounter() {
        const counter = document.getElementById('cart-counter');
        if (counter) {
            const count = this.getTotalItems();
            counter.textContent = count;
            counter.style.display = count > 0 ? 'block' : 'none';
        }
    },
    
    // Показать уведомление
    showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    },
    
    // Очистить корзину
    clearCart() {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
        this.updateCartCounter();
        this.updateCartDisplay(); // Обновляем отображение на странице корзины
        this.showNotification('Корзина очищена');
    },
    
    // Отобразить корзину на странице
    updateCartDisplay() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;
        
        const detailedCart = this.getDetailedCart();
        
        if (detailedCart.length === 0) {
            cartContainer.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
            document.getElementById('cart-total').textContent = '0';
            return;
        }
        
        let html = '';
        detailedCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">${item.price} ₽</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="CartManager.decreaseQuantity(${item.id})" 
                                class="quantity-btn">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="CartManager.increaseQuantity(${item.id})" 
                                class="quantity-btn">+</button>
                    </div>
                    <div class="cart-item-total">
                        ${itemTotal} ₽
                    </div>
                    <button onclick="CartManager.removeFromCart(${item.id})" 
                            class="remove-btn">×</button>
                </div>
            `;
        });
        
        cartContainer.innerHTML = html;
        
        // Обновляем общую сумму
        const totalElement = document.getElementById('cart-total');
        if (totalElement) {
            totalElement.textContent = this.getTotal();
        }
    },
    
    // Вспомогательные методы для изменения количества
    increaseQuantity(productId) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            this.updateQuantity(productId, item.quantity + 1);
        }
    },
    
    decreaseQuantity(productId) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            this.updateQuantity(productId, item.quantity - 1);
        }
    }
        */
};

// Делаем менеджер корзины глобально доступным
window.CartManager = CartManager;
