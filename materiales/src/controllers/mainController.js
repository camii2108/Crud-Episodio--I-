const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));//tengo los productos 

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");/* Una funcion  */

const controller = {
	index: (req, res) => {
		// Do the magic
		let productsInSale = products.filter(product => product.category === "in-sale");
		let productsVisited = products.filter(product => product.category === "visited");
		res.render("index", { // te rendecria o lleva auna vista 
			productsVisited, 
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
