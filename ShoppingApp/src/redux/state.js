import { createStore } from 'redux'
import { reducer } from './reducer'

let store
let State = {
    sessionID: '12',
    username: 'fenollh',
    usermail: 'fenollh@gmail.com',
    name: 'Hugo Fenoll',
    age: 17,
    phone: '644-41-53-37',
    stars: 4, // de 0-5
    description: 'Estudiante y creador de esta app.  Esqui de montaña y tecnologia.  Hoyo de Manzanares',
    image: 'https://www.skimostats.com/images/athletes/372-5e2587fe35036.png',
    accountType: '', //Costumer / Other
    details: {takeaway: false, delivery: false ,restaurant: false, creditcard: true}, //for costumer accounts the 3  fields are null
    renderedShops: [],
    tags: [' All ', 'Food', 'Sport',],
    selectedTag: ' All ',
    selectedCategorie: ' All ',
    favShopsList: [],
    shoppingList: [], // in shops accounts this object is null
    myOrders: [
        {costumermail: "fenollh@gmail.com", hour:new Date(Date.now()), itemCost: 15, itemName: "Pollo asado", quantity: 4, shop: "piopio@gmail.com", image: 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg'},
        {costumermail: "fenollh@gmail.com", hour:new Date(Date.now()), itemCost: 4, itemName: "Patatas", quantity: 2, shop: "piopio@gmail.com", image: 'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/07/Patatas-fritas-al-horno-muy-ricas-y-sin-apenas-aceite.jpg'},
    ],
    myStock: { // in costumer accounts this object is null
        availableTables: 10,
        availableProducts: [
            {name: 'pollo', description: '', image: '', cost: 15, quantity: -1 }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'patatas', description: '', image: '', cost: 4, quantity: -1 },
            {name: 'lasana', description: '', image: '', cost: 4, quantity: 10 },
        ]
    },
    schedule: 'lunes a viernes de 9 a 2, fines de semana de 10 a 1',
    location: 'Plaza mayor de Hoyo de Manzanares',
}
store = createStore(
    reducer,
    State
)

export {State}
export {store}