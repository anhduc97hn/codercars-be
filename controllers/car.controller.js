const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const { make, model, release_date, transmission_type, size, style, price } =
      req.body;

    // Handle errors

    // Missing required data
    if (
      !make ||
      !model ||
      !release_date ||
      !transmission_type ||
      !size ||
      !style ||
      !price
    ) {
      const exception = new Error(`Missing required data`);
      exception.statusCode = 401;
      throw exception;
    }

    // Handle successful request

    let newCar = {
      make,
      model,
      release_date,
      transmission_type,
      size,
      style,
      price,
    };
    await Car.create(newCar);

    const response = {
      data: {
        message: "Create Car Successfully",
        car: newCar,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const cars = await Car.find({ isDeleted: false })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Car.countDocuments({ isDeleted: false });

    const response = {
      data: {
        message: "Get Car Successfully!",
        cars: cars,
        page: page,
        total: total,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const updates = req.body;
    const { id } = req.params;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    const response = {
      data: {
        message: "Update Car Successfully!",
        updatedCar,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } },
      { new: true }
    );

    const response = {
      data: {
        message: "Delete Car Successfully!",
        deletedCar,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
