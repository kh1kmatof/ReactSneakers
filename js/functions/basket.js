import { products } from "../products.js"

let basketItems = []

export const initBasket = () => {
    let basket = document.querySelector('.basket')
    let openBasket = document.querySelector('.basket-btn')
    let closeBasket = document.querySelector('.basket-close')
    let addBtns = document.querySelectorAll('.product_basket-button')

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

    addBtns.forEach((addBtn) => {
        let svgs = addBtn.querySelectorAll('svg')
        addBtn.addEventListener('click', () => {
            svgs.forEach((svg) => {
                svg.classList.toggle('active')
            })
            console.log();
            let foundProduct = products.find((product) => {
                return product.id === Number(addBtn.closest('.product').dataset.id)
            })

            let isExist = basketItems.find((item) => {
                return item.id === foundProduct.id
            })

            if (!isExist) {
                basketItems.push(foundProduct)
            }
            else {
                basketItems = basketItems.filter((item) => item.id !== foundProduct.id)

            }

            console.log(basketItems);
        })
    })
}