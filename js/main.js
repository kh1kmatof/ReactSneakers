import { products } from "./products.js"
import { renderProducts } from "./functions/render.js"
import { initBasket } from "./functions/basket.js"
import { initFilter } from "./functions/filter.js"
import { initFavourites } from "./functions/favourites.js"

renderProducts(products)
initBasket()
initFavourites()
initFilter()