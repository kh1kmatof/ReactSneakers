import { products } from "../products.js"
import { renderProducts } from "./render.js"
import { initBasket } from "./basket.js"

export const initFilter = () => {
    let searchInput = document.querySelector('.main-input')
    let productsContainer = document.querySelector('.products')
    let mainTitle = document.querySelector('.main-title')

    if (!searchInput || !productsContainer) return

    searchInput.addEventListener('input', () => {
        let searchText = searchInput.value.trim().toLowerCase()

        if (searchText.length > 0) {
            mainTitle.textContent = `Поиск по запросу: "${searchInput.value}"`
        } else {
            mainTitle.textContent = 'Все кроссовки'
        }

        let filteredProducts = products.filter((item) => {
            return item.title.toLowerCase().includes(searchText)
        })

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <p style="font-size: 18px; color: #9D9D9D; padding: 40px 0;">
                    По вашему запросу ничего не найдено 😔
                </p>
            `
            return
        }

        renderProducts(filteredProducts)
        initBasket()
    })
}