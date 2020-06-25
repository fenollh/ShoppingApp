import React from 'react'

let State = {
    sessionID: '',
    username: 'fenollh',
    usermail: 'fenollh@gmail.com',
    profileName: 'Hugo Fenoll',
    profileDescription: {profession: 'Estudiante y creador de esta app', hobbies: 'Esqui de montaña y tecnologia', location: 'Hoyo de Manzanares'},
    profileImage: 'https://www.skimostats.com/images/athletes/372-5e2587fe35036.png',
    accountType: 'Costumer', //Costumer / Shop
    renderedShops: [],
    tags: ['Favourites', 'Near', 'Fast Food', 'Italian', 'Chinese'],
    favouriteShops: [],
    shoppingList: {
        public: true,
        users: ['fenollh@gmail.com', 'fenollmi@gmail.com', 'tejedorc@gmail.com', 'jafenoll@gmail.com'],
        items: [
            {name:'Leche', id:0}, 
            {name:'Cereales', id:1}, 
            {name:'Galletas', id:2}, 
            {name:'Carne', id:3}, 
            {name:'Verduras', id:4}, 
            {name:'Pan', id:5}
            ]
    },
    myOrders :[
        {shop: 'Pio Pio', dateHour: '2-dic 14:30', order: [
            {name: 'pollo', quantity: 2, cost: 15}, 
            {name: 'lasaña', quantity: 2, cost: 15}
        ]},
        {shop: 'Fruteria Hoyo', dateHour: '2-dic 14:40', order: [
            {name: 'tomates', quantity: 2, cost: 5}, 
            {name: 'manzanas', quantity: 2, cost: 7},
            {name: 'sandia', quantity: 1, cost: 10},
            {name: 'melocotones', quantity: 5, cost: 4}
        ]},

    ]
}
export {State}

