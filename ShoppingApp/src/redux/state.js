import { createStore } from 'redux'
import { reducer } from './reducer'

let store
let State = {
    sessionID: '',
    username: '',
    usermail: '',
    name: '',
    age: null,
    phone: '',
    stars: null, // de 0-5
    description: '',
    image: '',
    accountType: '', //Costumer / Other
    details: [], //for costumer accounts the 3  fields are null
    renderedShops: [],
    tags: [' All ', 'Food', 'Sport',],
    myTags: [],
    selectedTag: ' All ',
    selectedCategorie: ' All ',
    favShopsList: [],
    shoppingList: [], // in shops accounts this object is null
    myOrders: [
        {costumermail: "fenollh@gmail.com", hour:new Date(Date.now()), itemCost: 15, itemName: "Pollo asado", quantity: 4, shop: "piopio@gmail.com", image: 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg'},
        {costumermail: "fenollh@gmail.com", hour:new Date(Date.now()), itemCost: 4, itemName: "Patatas", quantity: 2, shop: "piopio@gmail.com", image: 'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/07/Patatas-fritas-al-horno-muy-ricas-y-sin-apenas-aceite.jpg'},
    ],
    stock: {
        availableTables: 10,
        availableProducts: [
            {name: 'pollo', description: '', image: '', cost: 15, quantity: -1, max:10, tags:['pollo'] }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
        ]
    },
    schedule: '',
    location: '',
}
store = createStore(
    reducer,
    State
)

export {State}
export {store}