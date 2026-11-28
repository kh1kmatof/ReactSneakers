import { products } from "../products.js"

let basketItems = JSON.parse(localStorage.getItem('sneakers_basket')) || []
let orderCount = Number(localStorage.getItem('sneakers_order_count')) || 1
let isBasketEventsAttached = false

export const initBasket = () => {
    let basket = document.querySelector('.basket')
    let openBasket = document.querySelector('.basket-btn')
    let closeBasketBtn = document.querySelector('.basket-close')
    let addBtns = document.querySelectorAll('.product_basket-button')
    let basketList = document.querySelector('.basket_items')
    let basketPrice = document.querySelector('#basketPrice')
    let basketTax = document.querySelector('#basketTax')
    let basketTotal = document.querySelector('#basketTotal')
    let basketSpan = document.querySelector('.basket-span')
    let basketBottom = document.querySelector('.basket_bottom')
    let basketClean = document.querySelector('.basket_clean')
    let basketCleanButton = document.querySelector('.basket_clean-button')
    let basketOrder = document.querySelector('.basket_order-btn')

    let basketOrdered = document.querySelector('.basket_ordered')
    let basketOrderedButton = document.querySelector('.basket_ordered-button')
    let orderNumber = document.querySelector('#orderNumber')
    let orderTimer

    if (!basket || !openBasket) return

    let imgPrefix = window.location.pathname.includes('/pages/') ? '../' : ''

    if (!isBasketEventsAttached) {
        openBasket.addEventListener('click', () => {
            basket.classList.add('active')
        })

        function closeBasket() {
            basket.classList.remove('active')
        }

        closeBasketBtn.addEventListener('click', closeBasket)
        basketCleanButton.addEventListener('click', closeBasket)
        basketOrderedButton.addEventListener('click', closeBasket)

        basket.addEventListener('click', (close) => {
            if (close.target === basket) {
                basket.classList.remove('active')
            }
        })

        basketOrder.addEventListener('click', () => {
            let subtotal = 0
            basketItems.forEach((item) => {
                subtotal += item.price * item.count
            })
            let totalWithTax = subtotal + Math.round(subtotal * 0.05)

            let newOrder = {
                orderId: orderCount,
                totalPrice: totalWithTax,
                items: basketItems
            }

            let oldOrders = JSON.parse(localStorage.getItem('sneakers_orders')) || []
            let updatedOrders = [...oldOrders, newOrder]
            localStorage.setItem('sneakers_orders', JSON.stringify(updatedOrders))

            basketItems.forEach((item) => {
                let productCard = document.querySelector(`.product[data-id="${item.id}"]`)
                if (productCard) {
                    let svgs = productCard.querySelectorAll('.product_basket-button svg')
                    svgs.forEach((svg) => {
                        svg.classList.toggle('active')
                    })
                }
            })

            basketItems = []
            renderBasket()

            orderNumber.textContent = `#${orderCount}`
            orderCount += 1
            localStorage.setItem('sneakers_order_count', orderCount)

            basketClean.classList.add('active')
            basketOrdered.classList.add('active')

            clearTimeout(orderTimer)
            orderTimer = setTimeout(() => {
                basketOrdered.classList.remove('active')
                basketClean.classList.remove('active')
            }, 4000)
        })

        isBasketEventsAttached = true
    }

    const renderBasket = () => {
        basketList.innerHTML = ''
        let totalPrice = 0

        basketItems.forEach((item) => {
            let minusClass = item.count === 1 ? 'active' : ''

            basketList.innerHTML += `
                <div class="basket_item" data-id="${item.id}">
                    <img class="basket_item-img" src="${imgPrefix}${item.img}" alt="${item.title}">

                    <div class="basket_item-info">
                        <h4 class="basket_item-title">${item.title}</h4>
                        <b class="basket_item-price">${item.price * item.count} руб.</b>

                        <div class="basket_item-counter">
                            <button class="basket_item-qty basket-minus ${minusClass}" type="button">−</button>
                            <span class="basket_item-count">${item.count}</span>
                            <button class="basket_item-qty basket-plus" type="button">+</button>
                        </div>
                    </div>

                    <button class="basket_item-remove" type="button">✕</button>
                </div>
            `

            totalPrice += item.price * item.count
        })

        let tax = Math.round(totalPrice * 0.05)
        let allPrice = totalPrice + tax
        basketPrice.innerHTML = `${totalPrice} руб.`
        basketTax.innerHTML = `${tax} руб.`
        basketTotal.innerHTML = `${allPrice} руб.`
        basketSpan.innerHTML = `${allPrice} руб.`

        let basketPlus = basketList.querySelectorAll('.basket-plus')
        basketPlus.forEach((btn) => {
            btn.addEventListener('click', () => {
                let id = Number(btn.closest('.basket_item').dataset.id)
                let found = basketItems.find((item) => item.id === id)

                found.count += 1
                renderBasket()
            })
        })

        let basketMinus = basketList.querySelectorAll('.basket-minus')
        basketMinus.forEach((btn) => {
            btn.addEventListener('click', () => {
                let id = Number(btn.closest('.basket_item').dataset.id)
                let found = basketItems.find((item) => item.id === id)

                if (found.count > 1) {
                    found.count -= 1
                    renderBasket()
                }
            })
        })

        let basketRemuve = basketList.querySelectorAll('.basket_item-remove')
        basketRemuve.forEach((remuve) => {
            remuve.addEventListener('click', () => {
                let id = Number(remuve.closest('.basket_item').dataset.id)

                basketItems = basketItems.filter((item) => item.id !== id)

                let productCard = document.querySelector(`.product[data-id="${id}"]`)
                if (productCard) {
                    let svgs = productCard.querySelectorAll('.product_basket-button svg')
                    svgs.forEach((svg) => {
                        svg.classList.toggle('active')
                    })
                }

                renderBasket()
            })
        })

        if (basketItems.length != 0) {
            clearTimeout(orderTimer)
            basketOrdered.classList.remove('active')
            basketBottom.classList.add('active')
            basketList.classList.add('active')
            basketClean.classList.add('active')
        } else {
            basketClean.classList.remove('active')
            basketList.classList.remove('active')
            basketBottom.classList.remove('active')
        }

        localStorage.setItem('sneakers_basket', JSON.stringify(basketItems))
    }

    addBtns.forEach((addBtn) => {
        let svgs = addBtn.querySelectorAll('svg')

        addBtn.addEventListener('click', () => {
            svgs.forEach((svg) => {
                svg.classList.toggle('active')
            })

            let foundProduct = products.find((product) => {
                return product.id === Number(addBtn.closest('.product').dataset.id)
            })

            let isExist = basketItems.find((item) => {
                return item.id === foundProduct.id
            })

            if (!isExist) {
                basketItems.push({ ...foundProduct, count: 1 })
            } else {
                basketItems = basketItems.filter((item) => item.id !== foundProduct.id)
            }

            renderBasket()
        })
    })

    basketItems.forEach((item) => {
        let productCard = document.querySelector(`.product[data-id="${item.id}"]`)
        if (productCard) {
            let svgs = productCard.querySelectorAll('.product_basket-button svg')
            svgs[0].classList.remove('active')
            svgs[1].classList.add('active')
        }
    })

    renderBasket()
}