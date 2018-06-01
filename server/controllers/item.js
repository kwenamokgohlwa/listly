const Item = require('../models').Item;
const List = require('../models').List;

module.exports = {
  create(req, res) {
    return Item
      .create({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        checked: req.body.checked,
        listId: req.params.id
      })
      .then(item => res.status(201).redirect(`/lists/${item.listId}`))
      .catch(error => res.status(400).send(error));
  },

  show(req, res) {
    return List
      .findById(req.params.id, {
        include: [{
          model: Item,
          as: 'items'
        }]
      })
      .then(list => res.status(200).send(list.items))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Item
      .findById(req.body.itemId)
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: 'Item Not Found',
          });
        }
        return item
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).redirect(`/lists/${item.listId}`))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
      return Item
        .findById(req.body.itemId)
        .then(item => {
          if (!item) {
            return res.status(400).send({
              message: 'Item Not Found',
            });
          }
          return item
            .destroy()
            .then(() => res.status(204).redirect(`/lists/${item.listId}`))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

};
