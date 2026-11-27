let productsList = document.querySelector('.products')

export const renderProducts = (list) => {
    productsList.innerHTML = ''


    list.forEach(product => {
        productsList.innerHTML += `
            <div class="product" data-id="${product.id}">
                        <button class="product_favourite-button" type="button">
                            <svg class="product_favourite-svg product_favourite-svg-none active"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M4.24 12.25a4.2 4.2 0 0 1-1.24-3A4.25 4.25 0 0 1 7.25 5c1.58 0 2.96.86 3.69 2.14h1.12A4.24 4.24 0 0 1 15.75 5A4.25 4.25 0 0 1 20 9.25c0 1.17-.5 2.25-1.24 3L11.5 19.5zm15.22.71C20.41 12 21 10.7 21 9.25A5.25 5.25 0 0 0 15.75 4c-1.75 0-3.3.85-4.25 2.17A5.22 5.22 0 0 0 7.25 4A5.25 5.25 0 0 0 2 9.25c0 1.45.59 2.75 1.54 3.71l7.96 7.96z" />
                            </svg>
                            <svg class="product_favourite-svg " xmlns="http://www.w3.org/2000/svg" width="20"
                                height="20" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                            </svg>
                        </button>
                        <img class="product-img" src="${product.img}" alt="">
                        <p class="product-text">${product.title}</p>
                        <div class="product_price">
                            <div class="product__price">
                                <p class="product__price-text">Цена:</p>
                                <h3 class="product__price-price">${product.price} руб.</h3>
                            </div>
                            <button class="product_basket-button">
                                <svg class="product_basket-svg product_favourite-svg-none active"
                                    xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                    viewBox="0 0 24 24"><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" />
                                </svg>
                                <svg class="product_basket-svg " xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                    viewBox="0 0 24 24"><!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" d="m5 12l5 5L20 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
        `
    });
}