const sequelize = require('../../server/models/index').sequelize;
const List = require("../../server/models").List;
const Item = require("../../server/models").Item;
const User = require("../../server/models").User;

describe("Item", () => {

  beforeEach((done) => {
    this.list;
    this.item;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        name: "Kwena",
        surname: "Mokgohlwa",
        email: "kwena@mokgohlwa.com",
        password: "1234567"
      })
      .then((user) => {
        this.user = user; //store the user

        List.create({
          name: "Groceries",
          userId: this.user.id,
          items: [{
            name: "Milk",
            quantity: 3,
            price: 10.25,
            checked: false,
            listId: 1
          }]
        }, {
          include: {
            model: Item,
            as: "items"
          }
        })
        .then((list) => {
          this.list = list; //store the list
          this.item = list.items[0]; //store the item
          done();
        })
      })
    });
  });

  describe("#create()", () => {

    it("should create an Item object with a name and listId", (done) => {
      Item.create({
        name: "Cheese",
        listId: 1
      })
      .then((item) => {
        expect(item.name).toBe("Cheese");
        expect(item.id).toBe(2);
        expect(item.price).toBe(0);
        expect(item.quantity).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a Item without name and listId", (done) => {
      List.create({
        name: null,
        listId: null
      })
      .then((list) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("List.name cannot be null");
        expect(err.message).toContain("List.userId cannot be null");
        done();
      });
    });

  });

});
