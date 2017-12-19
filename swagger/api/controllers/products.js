var Product = require('../../mongoose').Product();

function getAllProducts(req, res) {
  Product.find().exec()
    .then(products => res.json(products))
    .catch(error => res.status(404).json(error));
}

function addNewProduct(req, res) {
  Product.create(req.swagger.params.product.value)
    .then(product => res.json(product))
    .catch(error => res.status(404).json(error));
}

function getProduct(req, res) {
  Product.findOne({ _id: req.swagger.params.id.value }).select('-reviews').exec()
    .then(product => res.json(product || {}))
    .catch(error => res.status(404).json(error));
}

function upsertProduct(req, res) {
  Product.findByIdAndUpdate(req.swagger.params.id.value, req.swagger.params.product.value, { new: true, upsert: true, runValidators: true })
    .then(product => res.json(product))
    .catch(error => res.status(404).json(error));
}

function deleteProduct(req, res) {
  Product.remove({ _id: req.swagger.params.id.value })
    .then(() => res.json())
    .catch(error => res.status(404).json(error));
}

function getProductReviews(req, res) {
  Product.findOne({ _id: req.swagger.params.id.value }).select('reviews').exec()
    .then(reviews => res.json(reviews || {}))
    .catch(error => res.status(404).json(error));
}

module.exports = {
  getAllProducts: getAllProducts,
  addNewProduct: addNewProduct,
  getProduct: getProduct,
  upsertProduct: upsertProduct,
  deleteProduct: deleteProduct,
  getProductReviews: getProductReviews
};
