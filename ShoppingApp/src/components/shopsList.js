/*
SHOPS LIST 
este archivo contendra objetos tipo tienda con el fin de
poder seguir desarrollando la interfaz aunque el servidor 
y la API no esten operativos.
Cuendo el servidor, la API y la base de datos esten operativos 
este archivo dejara de existir. 
*/

const Shops = [
    {name: 'Pio pio',
    email: 'piopio@gmail.com',
    phone: '644-41-53-37',
    managerName: 'Pepe Gonzalez',
    accountType: 'Shop',
    shopDetails: {takeaway: true, delivery: false ,restaurant: false},
    stars: [1,1,1,1,0],
    profileDescription: 'Asador de pollos con servicio de comida para llevar ubicado en Hoyo de Manzanares.',
    profileImage: 'https://media-cdn.tripadvisor.com/media/photo-s/06/e5/1c/29/getlstd-property-photo.jpg',
    tags: ['asador', 'hoyo de manzanares', 'para llevar'],
    stock: {
        availableTables: 0,
        availableProducts: [
            {name: 'pollo', description: 'Deliciosos pollos asados por encargo', image: 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg', cost: 15, quantity: -1 }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'patatas', description: 'Patatas fritas ideales para acompañar el pollo', image: 'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/07/Patatas-fritas-al-horno-muy-ricas-y-sin-apenas-aceite.jpg', cost: 4, quantity: -1 },
            {name: 'lasana', description: 'Lasaña para llevar de calidad', image: 'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg', cost: 4, quantity: 10 },
            {name: 'ensaladilla', description: 'Ensaladilla para llevar de calidad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS8UKi2vWGlEQ3tiOTMIM6ZhHW_nX5p_DeIA&usqp=CAU', cost: 4, quantity: 5 },
            {name: 'empanadillas', description: 'Deliciosas empanadillas de pisto o pollo para acompañar cualquier comida', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnj764D9c3hg649aJ6SF2BRA1fuDPjdGGhhA&usqp=CAU', cost: 2, quantity: 20 },
        ]
    
    }
    },
    {name: 'Pio pio 2',
    email: 'piopio@gmail.com',
    phone: '644-41-53-37',
    managerName: 'Pepe Gonzalez',
    accountType: 'Shop',
    shopDetails: {takeaway: true, delivery: false ,restaurant: false},
    stars: [1,1,1,1,0],
    profileDescription: 'Asador de pollos con servicio de comida para llevar ubicado en Hoyo de Manzanares.',
    profileImage: 'https://media-cdn.tripadvisor.com/media/photo-s/06/e5/1c/29/getlstd-property-photo.jpg',
    tags: ['asador', 'hoyo de manzanares', 'para llevar'],
    stock: {
        availableTables: 0,
        availableProducts: [
            {name: 'pollo', description: 'Deliciosos pollos asados por encargo', image: 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg', cost: 15, quantity: -1 }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'patatas', description: 'Patatas fritas ideales para acompañar el pollo', image: 'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/07/Patatas-fritas-al-horno-muy-ricas-y-sin-apenas-aceite.jpg', cost: 4, quantity: -1 },
            {name: 'lasana', description: 'Lasaña para llevar de calidad', image: 'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg', cost: 4, quantity: 10 },
            {name: 'ensaladilla', description: 'Ensaladilla para llevar de calidad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS8UKi2vWGlEQ3tiOTMIM6ZhHW_nX5p_DeIA&usqp=CAU', cost: 4, quantity: 5 },
            {name: 'empanadillas', description: 'Deliciosas empanadillas de pisto o pollo para acompañar cualquier comida', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnj764D9c3hg649aJ6SF2BRA1fuDPjdGGhhA&usqp=CAU', cost: 2, quantity: 20 },
        ]
    
    }
    }
] 

export {Shops}