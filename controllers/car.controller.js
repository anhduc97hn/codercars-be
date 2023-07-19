const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
	} catch (err) {
		// YOUR CODE HERE
	}
};

carController.getCars = async (req, res, next) => {
	try {
		let {page, limit} = req.query;
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 10;

		const cars = await Car.find().skip((page -1)*limit).limit(limit); 
		
		const response = {
			message: "Get Car Successfully!",
			cars: cars,
			page: page, 
		}

		return res.status(200).send(response)

	} catch (err) {
		next(err)
	}
};

carController.editCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
	} catch (err) {
		// YOUR CODE HERE
	}
};

carController.deleteCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
	} catch (err) {
		// YOUR CODE HERE
	}
};

module.exports = carController;
