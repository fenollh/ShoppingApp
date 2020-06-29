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
    shopDetails: {takeaway: true, delivery: false ,restaurant: false, card: true},
    stars: [1,1,1,1,0],
    profileDescription: 'Asador de pollos con servicio de comida para llevar ubicado en Hoyo de Manzanares.',
    profileImage: 'https://media-cdn.tripadvisor.com/media/photo-s/06/e5/1c/29/getlstd-property-photo.jpg',
    tags: ['asador', 'hoyo de manzanares', 'para llevar'],
    categories: ['Pollos', 'Patatas', 'Empanadillas'],
    stock: {
        availableTables: 0,
        availableProducts: [
            {name: 'pollo', description: 'Deliciosos pollos asados por encargo', image: 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg', cost: 15, quantity: -1, tags: ['pollo asado'] }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'patatas', description: 'Patatas fritas ideales para acompañar el pollo', image: 'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/07/Patatas-fritas-al-horno-muy-ricas-y-sin-apenas-aceite.jpg', cost: 4, quantity: -1, tags: ['patatas'] },
            {name: 'lasana', description: 'Lasaña para llevar de calidad', image: 'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg', cost: 4, quantity: 10, tags: ['lasana'] },
            {name: 'ensaladilla', description: 'Ensaladilla para llevar de calidad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS8UKi2vWGlEQ3tiOTMIM6ZhHW_nX5p_DeIA&usqp=CAU', cost: 4, quantity: 5, tags: ['ensaladilla'] },
            {name: 'empanadillas', description: 'Deliciosas empanadillas de pisto o pollo para acompañar cualquier comida', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnj764D9c3hg649aJ6SF2BRA1fuDPjdGGhhA&usqp=CAU', cost: 2, quantity: 20, tags: ['empanadillas'] },
        ]
    
    }
    },
    {name: 'McDonals',
    email: 'mcDonals@gmail.com',
    phone: '644-41-53-37',
    managerName: 'Juan Jimenez',
    accountType: 'Shop',
    shopDetails: {takeaway: true, delivery: false ,restaurant: true, card: true},
    stars: [1,1,1,0,0],
    profileDescription: 'Restaurante de comida rapida ubicado en el centro comercial de Torrelodones',
    profileImage: 'https://deresiduos.s3.amazonaws.com/uploads/news/image/14651/Mcdonalds-90s-logo.svg.png',
    tags: ['haburguesas', 'torrelodones', 'fast food'],
    categories: ['Menus', 'Hamburguesas', 'Patatas', 'Refrescos'],
    stock: {
        availableTables: 7,
        availableProducts: [
            {name: 'hamburguesa', description: 'Hamburgesa con bacon y queso', image: 'https://s1.eestatic.com/2016/02/23/cocinillas/Cocinillas_104501450_134854388_1706x960.jpg', cost: 15, quantity: -1, tags: ['hamburgesas'] }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'patatas', description: 'Patatas fritas', image: 'https://s.libertaddigital.com/2018/02/06/1920/1080/fit/patatas-mcdonalds.jpg', cost: 4, quantity: -1, tags: ['patatas'] },
            {name: 'CocaCola', description: 'Resfreco de CocaCola', image: 'https://controlpublicidad.com/uploads/2018/04/mcdonalds-090147.jpg', cost: 4, quantity: -1, tags: ['refresco'] },
            {name: 'nuguets', description: 'Nuguets de pollo', image: 'https://www.mcdonalds.com/content/dam/uk/nfl/nutrition/nfl-product/product/related/mcdonalds-20-Chicken-McNuggets-ShareBox.jpg', cost: 4, quantity: -1, tags: ['nugets'] },
            {name: 'ensalada', description: 'Ensalada con lechuga, tomate y aceitunas', image: 'https://lavozdelmuro.net/wp-content/uploads/2015/05/ensaladas-insanas-8-1.jpg', cost: 2, quantity: -1, tags: ['ensalada'] },
        ]
    
    }
    }
] 

export {Shops}