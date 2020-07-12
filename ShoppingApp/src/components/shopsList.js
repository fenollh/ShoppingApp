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
    accountType: 'Food',
    location: 'Hoyo de Manzanares C/Avenida Madrid Nº10',
    schedule: 'De martes a domingo de 12:00 a 22:00',
    shopDetails: {takeaway: true, delivery: false ,restaurant: false, card: true},
    stars: [1,1,1,1,0],
    profileDescription: 'Asador de pollos con servicio de comida para llevar ubicado en Hoyo de Manzanares.',
    profileImage: 'https://media-cdn.tripadvisor.com/media/photo-s/06/e5/1c/29/getlstd-property-photo.jpg',
    tags: ['asador', 'hoyo de manzanares', 'para llevar'],
    categories: [' All ', 'Pollos', 'Patatas', 'Empanadillas', 'Raciones'],
    stock: {
        availableSpace: 0,
        availableProducts: [
            {name: 'Pollo asado', description: 'Deliciosos pollos asados por encargo', image: 'https://www.hola.com/imagenes/cocina/recetas/20200130159403/pollo-asado-en-horno-de-lena/0-779-940/pollo-asado-m.jpg', cost: 15, quantity: -1, max: 5, tags: ['Pollos'] }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'Patatas', description: 'Patatas fritas ideales para acompañar el pollo', image: 'https://cdn6.recetasdeescandalo.com/wp-content/uploads/2019/07/Patatas-fritas-al-horno-muy-ricas-y-sin-apenas-aceite.jpg', cost: 4, quantity: -1, max: 7, tags: ['Patatas'] },
            {name: 'Lasaña', description: 'Lasaña para llevar de calidad', image: 'https://www.recetasdesbieta.com/wp-content/uploads/2018/10/lasagna-original..jpg', cost: 4, quantity: 10, max: 5, tags: ['Raciones'] },
            {name: 'Ensaladilla', description: 'Ensaladilla para llevar de calidad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS8UKi2vWGlEQ3tiOTMIM6ZhHW_nX5p_DeIA&usqp=CAU', cost: 4, quantity: 5, max: 5, tags: ['Raciones'] },
            {name: 'Empanadillas', description: 'Deliciosas empanadillas de pisto o pollo para acompañar cualquier comida', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnj764D9c3hg649aJ6SF2BRA1fuDPjdGGhhA&usqp=CAU', cost: 2, quantity: 20, max: 20, tags: ['Empanadillas'] },
        ]
    
    }
    },
    {name: 'McDonals',
    email: 'mcDonals@gmail.com',
    phone: '644-41-53-37',
    managerName: 'Juan Jimenez',
    accountType: 'Food',
    location: 'Torrelodones Centro Comercial Nº3',
    schedule: '24 horas 7 dias a la semana',
    shopDetails: {takeaway: true, delivery: false ,restaurant: true, card: true},
    stars: [1,1,1,0,0],
    profileDescription: 'Restaurante de comida rapida ubicado en el centro comercial de Torrelodones',
    profileImage: 'https://deresiduos.s3.amazonaws.com/uploads/news/image/14651/Mcdonalds-90s-logo.svg.png',
    tags: ['haburguesas', 'torrelodones', 'fast food'],
    categories: [' All ', 'Menus', 'Hamburguesas', 'Patatas', 'Refrescos'],
    stock: {
        availableSpace: 7,
        availableProducts: [
            {name: 'Hamburguesa', description: 'Hamburgesa con bacon y queso', image: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/02/07/15495589360473.jpg', cost: 15, quantity: -1, max: 10, tags: ['hamburgesas'] }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'Patatas', description: 'Patatas fritas', image: 'https://s.libertaddigital.com/2018/02/06/1920/1080/fit/patatas-mcdonalds.jpg', cost: 4, quantity: -1, max: 10, tags: ['patatas'] },
            {name: 'CocaCola', description: 'Resfreco de CocaCola', image: 'https://controlpublicidad.com/uploads/2018/04/mcdonalds-090147.jpg', cost: 4, quantity: -1, max: 10, tags: ['refresco'] },
            {name: 'Nuguets', description: 'Nuguets de pollo', image: 'https://www.mcdonalds.com/content/dam/uk/nfl/nutrition/nfl-product/product/related/mcdonalds-20-Chicken-McNuggets-ShareBox.jpg', cost: 4, quantity: -1, max: 10, tags: ['nugets'] },
            {name: 'Ensalada', description: 'Ensalada con lechuga, tomate y aceitunas', image: 'https://lavozdelmuro.net/wp-content/uploads/2015/05/ensaladas-insanas-8-1.jpg', cost: 2, quantity: -1, max: 10, tags: ['ensalada'] },
        ]
    
    }
    },
    {name: 'Polideportivo de Hoyo',
    email: 'poliHoyo@gmail.com',
    phone: '644-41-53-37',
    managerName: 'Javi Jimenez',
    accountType: 'Sport',
    location: 'Hoyo de Manzanares C/Avenida Instituto Nº24',
    schedule: 'De lunes a sabado de 9:00 a 22:00',
    shopDetails: {toilets: true, cafeteria: false, instructors: true, card: true},
    stars: [1,1,1,1,0],
    profileDescription: 'Polideportivo municipal de Hoyo de Mazanares',
    profileImage: 'https://imesapi.es/wp-content/uploads/2018/11/POLIDEPORTIVO-HOYO-DE-MANZANARES.jpg',
    tags: ['sports', 'hoyo de manzanares', 'polideportivo'],
    categories: [' All ', 'Instalaciones', 'Sesiones', 'Extraescolares'],
    stock: {
        availableSpace: 0,
        availableProducts: [
            {name: 'Badminton', description: 'Clases extraescolares de badminton', image: 'https://1.bp.blogspot.com/_-nzaxjFGHOY/S7HITc_o_dI/AAAAAAAABV4/TMAEdVXHRnA/s1600/Badminton2010.jpg', cost: 30, quantity: -1, max: 10, tags: ['Extraescolares'] }, //si en el parametro quantity se pone un numero negativo la cantidad del producto es indefinida
            {name: 'Natacion', description: 'Clases extraescolares de natacion', image: 'https://lh3.googleusercontent.com/proxy/ik0AG9PTwY093-JB8kEzExZXKCr0OrGiTFQV1NXW2ikvCnew73g28NlMUj7zvSYtRad1WrZHQC4Gq7vJKV56krQye3wLt7OdXtMLsD8rYlmPvZmb3srb5RgQahYTTJ5_ZjsC7ta7kVLFYhI', cost: 30, quantity: -1, max: 10, tags: ['Extraescolares'] },
            {name: 'Pistas de Badminton', description: 'Reserva de pistas de badminton', image: 'https://www.webconsultas.com/sites/default/files/pista_badminton.jpg', cost: 4, quantity: -1, max: 4, tags: ['Instalaciones'] },
            {name: 'Tenis', description: 'Clases extraescolares de tenis', image: 'https://i.eurosport.com/2020/05/20/2821602-58197075-1600-900.jpg', cost: 30, quantity: -1, max: 10, tags: ['Extraescolares'] },
            {name: 'Gimnasio', description: 'Reserva de plaza para el gimnasio', image: 'https://as01.epimg.net/argentina/imagenes/2020/04/15/tikitakas/1586970559_336126_1586972774_noticia_normal.jpg', cost: 30, quantity: -1, max: 4, tags: ['Instalaciones'] },
        ]
    
    }
    }
] 

export {Shops}