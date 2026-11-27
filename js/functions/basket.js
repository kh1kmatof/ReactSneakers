// Oddiy function ko'rinishi:
// export function initBasket() { ... }
export const initBasket = () => {
    let basket = document.querySelector('.basket')
    let openBasketBtn = document.querySelector('.basket-btn')
    let closeBasketBtn = document.querySelector('.basket-close')

    if (!basket) return

    // Oddiy function ko'rinishi:
    // function openDrawer() { ... }
    const openDrawer = () => {
        basket.classList.add('active')
    }

    // Oddiy function ko'rinishi:
    // function closeDrawer() { ... }
    const closeDrawer = () => {
        basket.classList.remove('active')
    }

    if (openBasketBtn) {
        openBasketBtn.addEventListener('click', openDrawer)
    }

    if (closeBasketBtn) {
        closeBasketBtn.addEventListener('click', closeDrawer)
    }

    // Qora fonga bosilganda ham yopiladi
    basket.addEventListener('click', (event) => {
        if (event.target === basket) {
            closeDrawer()
        }
    })
}