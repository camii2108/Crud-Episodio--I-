const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => { /* es una contante en la cual pueda reultilizar */
	fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding: "utf-8"}) /* le paso como parametro "LA RUTA GUARDADAD EN UNA VARIABLE" productsFilePath  */
}


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render("products", {products,toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let productId = Number(req.params.id);

		let product = products.find(product => product.id === productId);

		res.render("detail", {
			product,
			toThousand
		})

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic => OBTENER LOS DATOS DEL FORMULARIO
		/* res.send(req.body) */ /* req= params, body,ect  */
		/*  "id": 1,
  "name": "Cafetera Moulinex Dolce Gusto Edited",
  "price": 100,
  "discount": 50,
  "category": "visited",
  "description": "Cafetera Dolce Gusto Lumio. La cafetera Dolce Gusto Lumio es de variedad automática que ha llegado con un diseño radical al que nos tenía acostumbrados Dolce Gusto.En este post te contamos todo lo que necesitas saber sobre ella, desde sus características técnicas hasta la calidad de las cápsulas o price.",
  "image": "img-cafetera-moulinex.jpg" */

		let lastId = products[products.length - 1].id;
		console.log(lastId)	

		let newProduct = {
			id: lastId + 1,/* por cada producto se agrega un nuevo ID */
			name:req.body.name ,/* accedo a la prodiedad del nombre que tengo en el documento body */
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png",
		}

		products.push(newProduct); /* me pushea los nuevos productos que subamos en el fomulario */
		/* res.send(products) */ /* me envia o muestra los productos/array de objetos json en el body */
		writeJson(products);

		res.redirect("/products/")
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;