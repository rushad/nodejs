module.exports = {
  getAllCities: getAllCities,
  addNewCity: addNewCity
};

function getAllCities(req, res) {
//  var name = req.swagger.params.name.value || 'stranger';
//  var hello = util.format('Hello, %s!', name);
  const cities = [{
    name: 'Izhevsk',
    country: 'Russia'
  }];
  console.log(cities);
  res.json(cities);
}

function addNewCity(req, res) {
  console.log(req.swagger.params.city.value);
  res.json({});
}