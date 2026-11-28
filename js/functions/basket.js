import { products } from "../products.js"

let basketItems = []

export const initBasket = () => {
    let basket = document.querySelector('.basket')
    let openBasket = document.querySelector('.basket-btn')
    let closeBasket = document.querySelector('.basket-close')
    let addBtns = document.querySelectorAll('.product_basket-button')
    let basketList = document.querySelector('.basket_items')

    openBasket.addEventListener('click', () => {
        basket.classList.add('active')
    })

    closeBasket.addEventListener('click', () => {
        basket.classList.remove('active')
    })

    basket.addEventListener('click', (close) => {
        if (close.target === basket) {
            basket.classList.remove('active')
        }
    })



    const renderBasket = () => {
        basketList.innerHTML = ''

        basketItems.forEach((item) => {
            // 1. Mana shu yerda active klassi qo'shiladi yoki olib tashlanadi:
            let minusClass = ''
            if (item.count === 1) {
                minusClass = 'active'
            } else {
                minusClass = ''
            }

            // 2. Tayyorlangan minusClass o'zgaruvchisini tugma ichiga joylaymiz:
            basketList.innerHTML += `
                <div class="basket_item" data-id="${item.id}">
                    <img class="basket_item-img" src="${item.img}" alt="${item.title}">

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
        })

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

                // 1. Savatcha massividan o'chiramiz
                basketItems = basketItems.filter((item) => item.id !== id)

                // 2. Asosiy sahifadagi aynan shu ID li kartochkani topib, SVG tugmasini qaytaramiz
                let productCard = document.querySelector(`.product[data-id="${id}"]`)
                if (productCard) {
                    let svgs = productCard.querySelectorAll('.product_basket-button svg')
                    svgs.forEach((svg) => {
                        svg.classList.toggle('active')
                    })
                }

                // 3. Savatchani qayta chizamiz
                renderBasket()
            })
        })
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

            // Har safar ro'yxat o'zgarganda savatchani qayta chizamiz
            renderBasket()
        })
    })
}