const List = require('../models').List;

module.exports = {
  create(req, res) {
    return List
      .create({
        name: req.body.name,
        userId: req.user.id
      })
      .then(list => res.status(201).redirect("/lists"))
      .catch(error => res.status(400).send(error));
  },

  show(req, res) {
    return List
      .findAll({
        where: {
                userId: req.user.id
              }
      })
      .then(lists => res.status(200).send(lists))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return List
      .findById(req.params.id)
      .then(list => {
        if (!list) {
          return res.status(404).send({
            message: 'List Not Found',
          });
        }
        return list
          .update(req.body, { fields: Object.keys(req.body) })
          .then((list) => res.status(200).send(list))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
      return List
        .findById(req.params.id)
        .then(list => {
          if (!list) {
            return res.status(400).send({
              message: 'List Not Found',
            });
          }
          return list
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

};
