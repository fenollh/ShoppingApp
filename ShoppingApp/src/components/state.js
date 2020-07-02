let State = {
    sessionID: '',
    username: 'fenollh',
    usermail: 'fenollh@gmail.com',
    profileName: 'Hugo Fenoll',
    phone: '644-41-53-37',
    stars: [1, 1, 1, 1, 1], // de 0-5
    profileDescription: {profession: 'Estudiante y creador de esta app', hobbies: 'Esqui de montaña y tecnologia', location: 'Hoyo de Manzanares'},
    profileImage: 'https://www.skimostats.com/images/athletes/372-5e2587fe35036.png',
    accountType: 'Costumer', //Costumer / Shop
    shopDetails: {takeaway: null, delivery: null ,restaurant: null}, //for costumer accounts the 3  fields are null
    renderedShops: [],
    tags: [' All ','Favourites', 'Near', 'Fast Food', 'Italian', 'Chinese'],
    favouriteShops: [],
    shoppingList: { // in shops accounts this object is null
        public: true,
        users: ['fenollh@gmail.com', 'fenollmi@gmail.com', 'tejedorc@gmail.com', 'jafenoll@gmail.com'],
        items: [
            ]
    },
    myOrders: [
    ],
    myStock: { // in costumer accounts this object is null
        availableTables: 10,
        availableProducts: [
            {name: 'pollo', description: '', image: '', cost: 15, quantity: -1 }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'patatas', description: '', image: '', cost: 4, quantity: -1 },
            {name: 'lasana', description: '', image: '', cost: 4, quantity: 10 },
        ]

    }
}
export {State}

