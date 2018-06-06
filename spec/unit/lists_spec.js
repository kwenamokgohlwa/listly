const sequelize = require('../../server/models/index').sequelize;
const List = require("../../server/models").List;
const Item = require("../../server/models").Item;
const User = require("../../server/models").User;

describe("List", () => {

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

    it("should create a List object with a name", (done) => {
      List.create({
        name: "Groceries",
      })
      .then((list) => {
        expect(list.name).toBe("Groceries");
        expect(list.id).toBe(2);
        expect(list.private).toBe(false);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a List without a name and userId", (done) => {
      List.create({
        name: null,
      })
      .then((list) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("List.userId cannot be null");
        done();
      });
    });

  });

});
