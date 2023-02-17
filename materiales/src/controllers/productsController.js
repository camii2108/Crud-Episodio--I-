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

		let product = products.find(product => {/*  FUNDAMENTO DE LA FUNCION FLECHA:va entre llaves y return */
			 return product.id === productId;
		});

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
		let lastId = products[products.length - 1].id;
		/* console.log(lastId)	 */

		let newProduct = {
			id: lastId + 1,/* por cada producto se agrega un nuevo ID */
			name: req.body.name ,/* accedo a la prodiedad del nombre que tengo en el documento body */
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png",
		}

		products.push(newProduct); /* me pushea los nuevos productos que subamos en el fomulario */
		/* res.send(products) */ /* me envia o muestra los productos/array de objetos json en el body */
		writeJson(products);/* sobre escribe el json */

		res.redirect("/products/");
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productId = Number(req.params.id);/* Lo ejecuto como dato Number ya que si ahgo igualdas estricata me falla */
		let productToEdit = products.find(product => product.id === productId);/* retorna tru si este producto conincide con este objetoo propiedad */

		res.render("product-edit-form", {
			productToEdit, /* sigue seindo u producto literal, aunque se llamen igaul las variables productToEdit en la vista  product-edit-form.ejs */	
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let productId = Number(req.params.id);

	products.forEach(product => {
		if(product.id === productId){
			product.name = req.body.name;
			product.price = req.body.price;
			product.discount = req.body.discount;
			product.category = req.body.category;
			product.description = req.body.description;
		}
	});		
		writeJson(products);

		res.send("Producto editado correctamente");

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic:obtener el id del req params
		let productId = Number(req.params.id); /*  */

		//Busco el producto eliminar y lo borro del array
		products.forEach( product => {
			if(product.id === productId){
				let productToDestroy = products.indexOf(product);
				products.splice(productToDestroy, 1) 
			}
		})

		/* let newProductArray = products.filter(product => product.id !== productId) *//*  voy a tenener todos los productos menos el que quiero */

		//Sobre escribo el json con el array de productos modidifcados
		writeJson(products)
		
		// retorno un mensaje de exito 
		res.send("El producto fue destruido")

	}
};

module.exports = controller;