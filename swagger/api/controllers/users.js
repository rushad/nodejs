var User = require('../../mongoose').User();

function getAllUsers(req, res) {
  User.find().exec()
    .then(users => res.json(users))
    .catch(error => res.status(404).json(error));
}

function upsertUser(req, res) {
    User.findByIdAndUpdate(req.swagger.params.id.value, req.swagger.params.user.value, { new: true, upsert: true, runValidators: true })
    .then(user => res.json(user))
    .catch(error => res.status(404).json(error));
}

function deleteUser(req, res) {
    User.remove({ _id: req.swagger.params.id.value })
      .then(() => res.json())
      .catch(error => res.status(404).json(error));
}
  
module.exports = {
  getAllUsers: getAllUsers,
  upsertUser: upsertUser,
  deleteUser: deleteUser
};
