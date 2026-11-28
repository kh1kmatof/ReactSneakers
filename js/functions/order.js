import { initBasket } from "./basket.js"

let ordersFilled = document.querySelector('#ordersFilled')
let ordersEmpty = document.querySelector('#ordersEmpty')
let ordersList = document.querySelector('#ordersList')

let savedOrders = JSON.parse(localStorage.getItem('sneakers_orders')) || []

if (savedOrders.length > 0) {
    ordersFilled.classList.add('active')
    ordersEmpty.classList.remove('active')

    ordersList.classList.remove('products')
    ordersList.classList.add('orders_groups')
    ordersList.innerHTML = ''

    let reversedOrders = [...savedOrders].reverse()

    reversedOrders.forEach((order) => {
        let cardsHTML = ''

        order.items.forEach((item) => {
            let itemBaseSum = item.price * item.count
            let itemWithTax = itemBaseSum + Math.round(itemBaseSum * 0.05)

            cardsHTML += `
                <div class="product" data-id="${item.id}">
                    <span class="order-card-qty">x${item.count}</span>
                    <img class="product-img" src="../${item.img}" alt="${item.title}">
                    <p class="product-text">${item.title}</p>
                    <div class="product_price">
                        <div class="product__price">
                            <p class="product__price-text">Итого (с налог 5%):</p>
                            <h3 class="product__price-price">${itemWithTax} руб.</h3>
                        </div>
                    </div>
                </div>
            `
        })

        ordersList.innerHTML += `
            <div class="order_group">
                <div class="order_group-header">
                    <h2 class="order_group-title">Заказ #${order.orderId}</h2>
                    <div class="order_group-total">
                        <span>Общая сумма (с налог 5%):</span>
                        <b>${order.totalPrice} руб.</b>
                    </div>
                </div>
                <div class="products">
                    ${cardsHTML}
                </div>
            </div>
        `
    })
} else {
    ordersEmpty.classList.add('active')
    ordersFilled.classList.remove('active')
}

initBasket()