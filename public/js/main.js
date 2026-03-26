document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector('#burger');
    const menuTabletCloseBtn = document.querySelector('#menuTabletClose');
    const menuTablet = document.querySelector('#menuTablet');
    
    //Функция для отображения общего кол-ва товаров в корзине
    const cartTotalCount = document.getElementById('cart__counter');
    function getCartTotalCount() {
        if (!CartManager.getCart) {
            return 0;
        }else{
            let totalCount = CartManager.getTotalItems();
            cartTotalCount.textContent = totalCount;
        }
    }

    if (burger)  {
        burger.addEventListener('click', (e) => {
        e.preventDefault();

        if (menuTablet.classList.contains('menuTablet--active')) {
            menuTablet.classList.remove('menuTablet--active');
        } else {
            menuTablet.classList.add('menuTablet--active');
        }
    });
    }

 if (menuTabletCloseBtn) {
        menuTabletCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        menuTablet.classList.remove('menuTablet--active');
    });
 }

    const swiper_slides = new Swiper('.ScreenSlider__object', {
        direction: 'horizontal',
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    const swiper_actions = new Swiper ('.actions__bottom__object', {
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
            draggable: true,
        }
    });

    /* CatalogNavTemplate */
    const mockCatalogNavTemplate = [
        {
            id: 1,
            name: 'Смесители',
            quantity: 370,
            img: './assets/images/pages/catalog/sinks.png'
        },
        {
            id: 2,
            name: 'Душевые системы',
            quantity: 120,
            img: './assets/images/pages/catalog/shower_systems.png'
        },
        {
            id: 3,
            name: 'Душевые стойки',
            quantity: 120,
            img: './assets/images/pages/catalog/shower_racks.png'
        },
        {
            id: 4,
            name: 'Изливы',
            quantity: 120,
            img: './assets/images/pages/catalog/spout.png'
        },
        {
            id: 5,
            name: 'Аксессуары',
            quantity: 120,
            img: './assets/images/pages/catalog/accessories.png'
        }
    ]
    const catalogNavTemplate = document.querySelector('#catalogNavTemplate');
    
    mockCatalogNavTemplate.forEach((item) => {
        const itemTemplate = catalogNavTemplate.content.cloneNode(true); // склонировали шаблон
        itemTemplate.querySelector('h3').textContent = item.name;
        itemTemplate.querySelector('img').setAttribute('src', item.img);
        itemTemplate.querySelector('img').setAttribute('alt', item.name);
        itemTemplate.querySelector('.catalog__nav__bottom__quantity').textContent = item.quantity;
    
        document.querySelector('.catalog__nav__bottom').append(itemTemplate)
    })

    /*FiltersListItemBrandTemplate*/
    const mockFiltersListItemBrandTemplate = [
        {
            id: 1,
            name: 'ACIARIUM INOX',
            quantity: 11,
        },
        {
            id: 2,
            name: 'ALKES',
            quantity: 19,
        },
        {
            id: 3,
            name: 'DRAKE',
            quantity: 4,
        },
        {
            id: 4,
            name: 'ELITE',
            quantity: 4,
        },
        {
            id: 5,
            name: 'ERYOS',
            quantity: 10,
        },
        {
            id: 6,
            name: 'GRANGE',
            quantity: 12,
        },
        {
            id: 7,
            name: 'IVORY',
            quantity: 3,
        },
        {
            id: 8,
            name: 'JAGO',
            quantity: 11,
        },
        {
            id: 9,
            name: 'KLARYNG',
            quantity: 36,
        },
        {
            id: 10,
            name: 'KUOVADIS',
            quantity: 12,
        },
        {
            id: 11,
            name: 'DANIELS',
            quantity: 28,
        },
    ]
    const filtersListItemBrandTemplate = document.querySelector('#filtersListItemBrandTemplate');

    mockFiltersListItemBrandTemplate.forEach((item) => {
        const itemTemplate = filtersListItemBrandTemplate.content.cloneNode(true);
        itemTemplate.querySelector('label').textContent = item.name;
        itemTemplate.querySelector('span').textContent = item.quantity;

        document.querySelector('.filters__collections').append(itemTemplate)
    })

    /*FiltersListItemStyleTemplate*/
    const mockFiltersListItemStyleTemplate = [
        {
            id: 1,
            name: 'Современный',
            quantity: 75
        },
        {
            id: 2,
            name: 'Ретро',
            quantity: 63
        },
        {
            id: 3,
            name: 'Футуризм',
            quantity: 14
        },
        {
            id: 4,
            name: 'Обалденный',
            quantity: 69
        }
    ]
    const filtersListItemStyleTemplate = document.querySelector('#filtersListItemStyleTemplate');

    mockFiltersListItemStyleTemplate.forEach((item) => {
        const itemTemplate = filtersListItemStyleTemplate.content.cloneNode(true);
        itemTemplate.querySelector('label').textContent = item.name;
        itemTemplate.querySelector('span').textContent = item.quantity;

        document.querySelector('.filters__style').append(itemTemplate)
    })

    /*FiltersListItemColorTemplate*/
    const mockFiltersListItemColorTemplate = [
        {
            id: 1,
            color_name: 'Золото'
        },
        {
            id: 2,
            color_name: 'Серебро'
        },
        {
            id: 3,
            color_name: 'Медь'
        },
        {
            id: 4,
            color_name: 'Хром'
        },
        {
            id: 5,
            color_name: 'Уголь'
        },
        {
            id: 6,
            color_name: 'В крапинку'
        }
    ]
    const filtersListItemColorTemplate = document.querySelector('#filtersListItemColorTemplate');

    mockFiltersListItemColorTemplate.forEach((item) => {
        const itemTemplate = filtersListItemColorTemplate.content.cloneNode(true);
        itemTemplate.querySelector('label').textContent = item.color_name;

        document.querySelector('.filters__color').append(itemTemplate)
    })


    /*FilterPriceRange*/
    const priceInput = document.querySelectorAll('.price__range__inputs input');
    const rangeInput = document.querySelectorAll('.price__range__dots input');    
    const progressFill = document.querySelector('.price__range__slider .progress');
    let priceGap = 100;

    priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = parseInt(priceInput[0].value);
            let maxPrice = parseInt(priceInput[1].value);

            if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "price__range__input__min") {
                    rangeInput[0].value = minPrice;
                    progressFill.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                }else{
                    rangeInput[1].value = maxPrice;
                    progressFill.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minValue = parseInt(rangeInput[0].value);
            let maxValue = parseInt(rangeInput[1].value);

            if (maxValue - minValue < priceGap) {
                if (e.target.className === "price__range__dot__min") {
                    rangeInput[0].value = maxValue - priceGap;
                }else{
                    rangeInput[1].value = minValue + priceGap;
                }
            }else{
                priceInput[0].value = minValue;
                priceInput[1].value = maxValue;
                progressFill.style.left = (minValue / rangeInput[0].max) * 100 + "%";
                progressFill.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%";
            }
        });
    });
    
    // initial load
    fetch('/api/items')
    .then(r => r.json())
    .then(items => {
        renderMockAssortment(items); 
    });

    const userIdForExample = 1;

    async function addItemToCart(user_id, item_id, price) {
        try {
            const url = new URL('/api/add_item', window.location.origin);
            url.searchParams.append('user_id', user_id);
            url.searchParams.append('item_id', item_id);
            url.searchParams.append('price', price);

            const addItemToCartResponse = await fetch(url, {
                method: 'POST'
            });            
            const data = addItemToCartResponse.data;
            return data;
        }catch (error) {
            console.error('Ошибка при вызове API:', error.addItemToCartResponse?.data || error.message);
        }
    }

    async function itemQuantityPlus(user_id, item_id, price) {
        try {
            const url = new URL('/api/plusItem', window.location.origin);
            url.searchParams.append('user_id', user_id);
            url.searchParams.append('item_id', item_id);
            url.searchParams.append('price', price);

            const itemQuantityPlusResponse = await fetch(url, {
                method: 'POST'
            });            
            const data = itemQuantityPlusResponse.data;
            return data;
        }catch (error) {
            console.error('Ошибка при вызове API:', error.itemQuantityPlusResponse?.data || error.message);
        }
    }

    async function itemQuantityMinus(user_id, item_id, price) {
        try {
            const url = new URL('/api/minusItem', window.location.origin);
            url.searchParams.append('user_id', user_id);
            url.searchParams.append('item_id', item_id);
            url.searchParams.append('price', price);

            const itemQuantityMinusResponse = await fetch(url, {
                method: 'POST'
            });            
            const data = itemQuantityMinusResponse.data;
            return data;
        }catch (error) {
            console.error('Ошибка при вызове API:', error.itemQuantityMinusResponse?.data || error.message);
        }
    }

    async function getCountPerItem(user_id, item_id) {        
        try {
            const url = new URL('/api/getItemCount', window.location.origin);
            url.searchParams.append('user_id', user_id);
            url.searchParams.append('item_id', item_id);

            const getCountPerItemResponse = await fetch(url, {
                method: 'GET'
            });            
            const data = getCountPerItemResponse.json();
            return data;
        }catch (error) {
            console.error('Ошибка при вызове API:', error.getCountPerItemResponse?.json || error.message);
        }
    }

    function renderMockAssortment(mockArray) {  
        
        

        const assortmentTemplate = document.querySelector('#assortmentTemplate');
        document.querySelector('.assortment__bottom').innerHTML = "";
        
        mockArray.forEach((item) => {

            //getCountPerItem(userIdForExample, item.id)

            const itemTemplate = assortmentTemplate.content.cloneNode(true);
            const assortmentItemTag = document.querySelector('#assortmentItemTag');

            itemTemplate.querySelector('.assortment__item__article').textContent = item.article;
            itemTemplate.querySelector('.assortment__item__name').textContent = item.name;

            //itemTemplate.querySelector('img').setAttribute('src', item.img);
            //itemTemplate.querySelector('img').setAttribute('alt', item.name);

            itemTemplate.querySelector('.assortment__item__colection__value').textContent = item.collection;
            
            if (!item.quantity) {
                itemTemplate.querySelector('.assortment__item__info__badge').classList.remove('assortment__item__info__badge--available');
                itemTemplate.querySelector('.assortment__item__info__badge').classList.add('assortment__item__info__badge--outofstock');
                itemTemplate.querySelector('.assortment__item__info__badge').innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="14" rx="7" fill="#E4E5E9"/>
                        <path d="M5 5L9 9" stroke="#797D91" stroke-linecap="round"/>
                        <path d="M5 9L9 5" stroke="#797D91" stroke-linecap="round"/>
                    </svg> Нет в наличии
                `;
            } else {
                itemTemplate.querySelector('.assortment__item__info__badge').classList.add('assortment__item__info__badge--available');
                itemTemplate.querySelector('.assortment__item__info__badge').classList.remove('assortment__item__info__badge--outofstock');
                itemTemplate.querySelector('.assortment__item__info__badge').innerHTML = `
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="14" height="14" rx="7" fill="#11D25E"/>
                    <path d="M4 6.5L6.16073 8.84079C6.23992 8.92658 6.37546 8.92658 6.45465 8.84079L10 5" stroke="white" stroke-linecap="round"/>
                </svg> В наличии
                `;
            }
            

            switch(item.tag) {
                case 'hit':
                    itemTemplate.querySelector('.assortment__item__tag--new').classList.add('d--none');
                    itemTemplate.querySelector('.assortment__item__tag--action').classList.add('d--none');
                    itemTemplate.querySelector('.assortment__item__tag--hit').classList.contains('d--none') ?
                        itemTemplate.querySelector('.assortment__item__tag--hit').classList.remove('d--none') : null;
                    break;
                case 'discount':
                    itemTemplate.querySelector('.assortment__item__tag--new').classList.add('d--none');
                    itemTemplate.querySelector('.assortment__item__tag--hit').classList.add('d--none');
                    itemTemplate.querySelector('.assortment__item__tag--action').classList.contains('d--none') ?
                        itemTemplate.querySelector('.assortment__item__tag--action').classList.remove('d--none') : null;
                    break;
                default:
                    itemTemplate.querySelector('.assortment__item__tag--action').classList.add('d--none');
                    itemTemplate.querySelector('.assortment__item__tag--hit').classList.add('d--none');
                    itemTemplate.querySelector('.assortment__item__tag--new').classList.contains('d--none') ?
                        itemTemplate.querySelector('.assortment__item__tag--new').classList.remove('d--none') : null;
                    break;
            }
            
            //Price
            if (item.action) {
                itemTemplate.querySelector('.assortment__item__price__par__action').classList.remove('d--none');
                itemTemplate.querySelector('.assortment__item__price__par__value').classList.add('discount--price');
            }

            itemTemplate.querySelector('.assortment__item__price--value').textContent = item.price;
            itemTemplate.querySelector('.assortment__item__price--action').textContent = item.action;

            // Button handler
            const itmBtn = itemTemplate.querySelector('.assortment__item__add');
            const ctrlBtn = itemTemplate.querySelector('.assortment__item__add__handler');
            const itmCount = itemTemplate.querySelector('.assortment__item__add__quantity');
            const btnMinus = itemTemplate.querySelector('.assortment__item--minus');
            const btnPlus = itemTemplate.querySelector('.assortment__item--plus');

            let count = CartManager.getTotalItemsPerProduct(item.id);
            let quantityBorder = 1;

            if (!CartManager.getTotalItemsPerProduct(item.id)) {
                if (itmBtn) {
                    itmBtn.addEventListener('click', async (e) => {
                        ctrlBtn.classList.remove('d--none');
                        itmBtn.classList.add('d--none');
                        addItemToCart(userIdForExample, item.id, item.price);                       
                        const countData = await getCountPerItem(userIdForExample, item.id);
                        count = countData
                        itmCount.innerHTML = count;
                        //getCartTotalCount();                        
                    });
                }   
            }else{
                ctrlBtn.classList.remove('d--none');
                const countData = getCountPerItem(userIdForExample, item.id);
                count = countData
                itmCount.innerHTML = count  
                itmBtn.classList.add('d--none');
            };  

            if (btnPlus) {
                btnPlus.addEventListener('click', async (e) => {
                    itemQuantityPlus(userIdForExample, item.id, item.price);
                    const countData = await getCountPerItem(userIdForExample, item.id);
                    count = countData
                    itmCount.innerHTML = count;
                });
            }

            if (btnMinus) {
                btnMinus.addEventListener('click', async (e) => {
                    if (count > quantityBorder) {
                        itemQuantityMinus(userIdForExample, item.id, item.price);
                        const countData = await getCountPerItem(userIdForExample, item.id);
                        count = countData
                        itmCount.innerHTML = count;
                        //getCartTotalCount(); 
                    }else{
                        ctrlBtn.classList.add('d--none');
                        itmBtn.classList.remove('d--none');
                        //CartManager.removeFromCart(item.id);
                        //getCartTotalCount(); 
                    }
                });
            }

            document.querySelector('.assortment__bottom').append(itemTemplate)
        });
    }   

    
    //Функция сортировки по убыванию цены
    function sortMockPriceAsc(mockArray) {
        if (!mockArray.action) {
            renderMockAssortment(mockArray.sort((a, b) => a.action - b.price))
        }else{            
            renderMockAssortment(mockArray.sort((a, b) => a.price - b.price))
        }
    }
    //Функция сортировки по возрастанию цены
    function sortMockPriceDesc(mockArray) {
        if (!mockArray.action) {
            renderMockAssortment(mockArray.sort((a, b) => b.action - a.price))
        }else{
            renderMockAssortment(mockArray.sort((a, b) => b.price - a.price))
        }
    }
    //Функция сортировки по доступному товару
    function sortMockAvailable(mockArray) {        
        renderMockAssortment(mockArray.filter(mockArray => mockArray.available === true))        
    }
    //Функция сортировки по НЕдоступному товару
    function sortMockNotAvailable(mockArray) {
        renderMockAssortment(mockArray.filter(mockArray => mockArray.available === false))  
    }

    //Функция сортировки по тегу "Новинки"
    function sortMockTagNew(mockArray) {
        renderMockAssortment(mockArray.filter(mockArray => mockArray.tag === 'new'))
    }
    //Функция сортировки по тегу "Акция"
    function sortMockTagActions(mockArray) {
        renderMockAssortment(mockArray.filter(mockArray => mockArray.tag === 'discount'))
    }
    //Функция сортировки по тегу "Хиты продаж"
    function sortMockTagHit(mockArray) {
        renderMockAssortment(mockArray.filter(mockArray => mockArray.tag === 'hit'))
    }

    //filterProductsFunc
    let filterProducts = itemData;

    function filterProductsFunc() {
        let selectedBrand = document.getElementById('filtersListItemBrandTemplate').value;        
    }

    //sort
    const sortPriceAsc = document.getElementById('price-asc');
    const sortPriceDesc = document.getElementById('price-desc');
    const sortItemAvailable = document.getElementById('available');
    const sortItemNotAvailable = document.getElementById('order');
    const sortItemNew = document.getElementById('filterNew');
    const sortItenActions = document.getElementById('filterActions');
    const sortItemHits = document.getElementById('filterHits');

    sortPriceAsc.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockPriceAsc(itemData);
    })

    sortPriceDesc.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockPriceDesc(itemData);
    })

    sortItemAvailable.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockAvailable(itemData);
    })

    sortItemNotAvailable.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockNotAvailable(itemData);
    })

    sortItemNew.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockTagNew(itemData);
    })

    sortItenActions.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockTagActions(itemData);
    })

    sortItemHits.addEventListener('click', (e) => {
        e.preventDefault();
        sortMockTagHit(itemData);
    })

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new RangeSlider();
});
});