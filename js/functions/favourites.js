export const getFavourites = () => {
    return JSON.parse(localStorage.getItem('sneakers_favourites')) || []
}

export const toggleFavourite = (id) => {
    let favIds = getFavourites()

    if (favIds.includes(id)) {
        favIds = favIds.filter((itemId) => itemId !== id)
    } else {
        favIds.push(id)
    }

    localStorage.setItem('sneakers_favourites', JSON.stringify(favIds))
}

export const initFavourites = () => {
    let favIds = getFavourites()
    let favBtns = document.querySelectorAll('.product_favourite-button')

    favBtns.forEach((btn) => {
        let card = btn.closest('.product')
        if (!card) return

        let id = Number(card.dataset.id)
        let svgs = btn.querySelectorAll('.product_favourite-svg')

        // Sahifa ochilganda xotirada bor mahsulotning yurakchasini qizartirish
        if (favIds.includes(id)) {
            svgs[0].classList.remove('active')
            svgs[1].classList.add('active')
        }

        // Yurakcha bosilganda saqlash / o'chirish
        btn.addEventListener('click', () => {
            toggleFavourite(id)
            svgs.forEach((svg) => {
                svg.classList.toggle('active')
            })
        })
    })
}