var City = require('../../mongoose').City();

function getAllCities(req, res) {
  City.find().exec()
    .then(cities => res.json(cities))
    .catch(error => res.status(404).json(error));
}

function getRandomCity(req, res) {
  City.aggregate([{ $sample: { size: 1 } }]).exec()
    .then(cities => res.json(cities[0]))
    .catch(error => res.status(404).json(error));
}

function addNewCity(req, res) {
  City.create(req.swagger.params.city.value)
    .then(city => res.json(city))
    .catch(error => res.status(404).json(error));
}

function upsertCity(req, res) {
  City.findByIdAndUpdate(req.swagger.params.id.value, req.swagger.params.city.value, { new: true, upsert: true, runValidators: true })
    .then(city => res.json(city))
    .catch(error => res.status(404).json(error));
}

function deleteCity(req, res) {
  City.remove({ _id: req.swagger.params.id.value })
    .then(() => res.json())
    .catch(error => res.status(404).json(error));
}

module.exports = {
  getAllCities: getAllCities,
  getRandomCity: getRandomCity,
  addNewCity: addNewCity,
  upsertCity: upsertCity,
  deleteCity: deleteCity
};
