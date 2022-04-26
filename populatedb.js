#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category')
var Item = require('./models/item')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var items = []

function categoryCreate(name, description, img, cb) {
  categorydetail = {name: name, description: description, img:img}
  
  var category = new Category(categorydetail)

  category.save(function (err) {
    if(err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + category);
    categories.push(category)
    cb(null, category)
  })
}

function itemCreate(name, description, category, cost, isbn, img, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    cost: cost,
    isbn: isbn,
    img: img
  }

  var item = new Item(itemdetail)
  item.save(function (err) {
    if(err) {
      console.log('ERROR CREATING Item: ' + item)
      cb(err, null)
      return
    }
    console.log('New Item: ' + item)
    items.push(item);
    cb(null, item)
  })
}

function createGenreAuthors(cb) {
    async.series([
        function(callback) {
          categoryCreate('Cell phones and Tablets', 'The best in cell phones and tablets at the best price, take the opportunity to bring a gift.', 'https://topesdegama.com/app/uploads-topesdegama.com/2021/03/AperTablets.jpg', callback)
        },
        function(callback) {
          categoryCreate('Computation', 'Buy a computer and get peripherals as a gift for your purchase, take advantage!', 'https://ideakreativa.net/wp-content/uploads/2020/04/laptop-para-disen%CC%83adores.jpg', callback)
        },
        function(callback) {
          categoryCreate('Home', 'Renew your home with these incredible pieces of furniture at half price, for your purchase over 50 dollars get a free vase.', 'https://kueski.com/blog/wp-content/uploads/2019/11/tiendas-muebles-en-linea.jpeg', callback)
        },
        function(callback) {
          categoryCreate('Fashion', 'No clothes for this summer, come and take advantage of this 2 for 1 on all summer clothes.', 'https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg', callback)
        },
        function(callback) {
          categoryCreate('Sports', 'All bicycles and scooters at half price for the Christmas season, come to our store.', 'https://img.freepik.com/foto-gratis/tipo-bicicleta-acrobacias-hace-girar-bicicleta-sobre-rueda-delantera-alrededor-su-eje-cualquier-proposito_496756-1783.jpg', callback)
        },
        function(callback) {
          categoryCreate('Books', 'New limited edition books, comics, manga and more at half price for a limited time only.', 'https://www.eleconomista.com.mx/__export/1618813105696/sites/eleconomista/img/2021/04/19/libros2.jpg_2118499843.jpg', callback)
        },
      ],
        // optional callback
        cb);
}


function createBooks(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Xiaomi POCO M4 PRO 5G NFC 6GB RAM 128GB ROM', 'Pantalla: 6.6 Pulgadas, Resolución: 1080 x 2400 píxeles, Procesador: Octa-core 2.4 GHz, Sistema Operativo: Android 11, Cámara Trasera: 50+8 MP, Cámara Frontal: 16 MP, Sensores: Huella digital (lateral), acelerómetro, giroscopio, brújula', categories[0], 919, '9781473211896', 'https://i.linio.com/p/3b7d78776a8c545bbd921bd439a18c13-product.webp', callback);
        },
        function(callback) {
          itemCreate("Tablet PC 10 Pulgadas Tablet 12GB RAM +ROM 512GB Android10", 'Modelo: tableta de 10 pulgadas, Sistema operativo: sistema Android  10.0, Procesador: MTKX30 ten core, Núcleo del procesador: diez núcleos, Frecuencia del procesador: 1.66GHz, Pantalla: pantalla IPS HD de 10pulgadas, Resolución de pantalla: pantalla de 800 * 1280 IPS HD', categories[0], 690, '9788401352836', 'https://i.linio.com/p/9866c950657e77442e8520b0b1c0d025-product.webp', callback);
        },
        function(callback) {
          itemCreate("Xiaomi Pad 5 6GB 256GB Perla Blanca", 'Modelo: tableta de 10 pulgadas, Sistema operativo: sistema Android  10.0, Procesador: MTKX30 ten core, Núcleo del procesador: diez núcleos, Frecuencia del procesador: 1.66GHz, Pantalla: pantalla IPS HD de 10pulgadas, Resolución de pantalla: pantalla de 800 * 1280 IPS HD', categories[0], 1699, '9780756411336', 'https://i.linio.com/p/0b09a51eb2aafc52e0cd24a26615903f-product.webp', callback);
        },
        function(callback) {
          itemCreate("UMIDIGI A11 Pro Max 8GB RAM 128GB", "Pantalla: 6.8 pulgadas FHD+ FullView, Resolución de la pantalla: 2460*1080, Procesador: Helio G80, Memoria ROM: 128GB, Memoria RAM: 8GB, Cámara trasera: 48MP, Cámara frontal: 24MP, Capacidad de la batería: 5150 mAh, Bluetooth 5.0, Bluetooth HID, Dual SIM 4G VoLTE", categories[0], 779, '9780765379528', 'https://i.linio.com/p/29b4f751e8d47a418d1fd966d4b958cf-product.webp', callback);
        },
        function(callback) {
          itemCreate('HP 15.6" FHD, Ryzen 5-5500U, 8GB RAM, 256GB SSD, SPRUCE BLUE, Windows 11',"Windows 11 with 6-core AMD Ryzen 5 5500U Processor, Up to 9.5 hours mixed usage, 9 hours video playback, 8.25 hours wireless streaming, 6.5 mm micro-edge Full HD anti-glare display, HP True Vision Camera, Fast charge laptop computer for school or home", categories[1], 2099, '9780765379504', 'https://i.linio.com/p/7d665b71fd7e182e87e57326fa0c44ef-product.webp', callback);
        },
        function(callback) {
          itemCreate('Tarjeta de Video Galax RTX 3070 TI', 'Marca : Galax, Modelo : 3070 TI SG, Numero de parte : 37ISM6MD4BSG, Capacidad : 8GB GDDR 6X , Nucleos Cuda : 6144, Reloj de impulso : 1800 MHz, Reloj OC : 1815 MHz, Velocidad de memoria : 19 Gbps, Ancho de banda de memoria : 608 GB / Seg, PCI-E : 4.0, Conexion : DisplayPort 1.4a (3), HDMI 2.1 (1), RGB : Si', categories[1], 5541, 'ISBN111111', 'https://i.linio.com/p/48f6ee1ebcb72367ce24adef25a12ff2-product.webp', callback);
        },
        function(callback) {
          itemCreate('Casaca Hombre Color Verde', 'Prenda: Casaca, Color: Verde, Estilo: Casual/Informal, Corte: Delgado, Material: Algodón, Marca:Lawrenceblack', categories[3], 122, 'ISBN222222', 'https://i.linio.com/p/82e14f5bdd6ce2064b852d5d4564ce8c-product.webp', callback)
        }
        ],
        // optional callback
        cb);
}

async.series([
    createGenreAuthors,
    createBooks
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+ items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



