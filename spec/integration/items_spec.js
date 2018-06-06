const request = require("request");
const server = require("../../server/server");
const base = "http://localhost:3000/api/lists";

const sequelize = require('../../server/models/index').sequelize;
const List = require("../../server/models").List;
const Item = require("../../server/models").Item;
const User = require("../../server/models").User;

describe("routes : items", () => {

  beforeEach((done) => { // before each context
    this.user;
    this.list;
    this.item;   // define variables and bind to context

    sequelize.sync({ force: true }).then(() => {  // clear database
      User.create({
        name: "Kwena",
        surname: "Mokgohlwa",
        email: "kwena@mokgohlwa.com",
        password: "1234567"
      })
      .then((user) => {
        this.user = user;

        List.create({
          name: "Groceries",
          userId: this.user.id
        })
        .then((list) => {
          this.list = list;

          Item.create({
            name: "Milk",
            quantity: 3,
            price: 10.25,
            checked: false,
            listId: this.list.id
          })
          .then((item) => {
            this.item = item;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });
  });

  describe("user performing CRUD actions for Items", () => {

    beforeEach((done) => {
      request.get({         // mock authentication
        url: "http://localhost:3000/auth/fake",
        form: {
          email: this.user.email,
          userId: this.user.id    // mock authenticate as user
        }
      });
      done();
    });

    describe("GET /api/lists/:id/show", () => {
      it("should respond with a list of items", (done) => {
        request.get(`${base}/${this.list.id}/show`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Milk");
          done();
        });
      });
    });

    describe("POST /api/lists/:id/create", () => {
      const options = {
        url: `${base}/${this.list}/create`,
        form: {
          name: "Chocolate",
          quantity: 1,
          price: 5.50,
          checked: true,
          listId: this.list
        }
      };

      it("should create a new item in the list and redirect to /lists/:id", (done) => {
        request.post(options, (err, res, body) => {
          Item.findOne({where: {name: "Chocolate"}})
          .then((item) => {
            expect(err).toBeNull();
            expect(item.name).toBe("Chocolate");
            expect(item.quantity).toBe(1);
            expect(item.price).toBe(5.50);
            expect(item.checked).toBe(true);
            expect(item.listId).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });

    describe("POST /api/lists/:id/items/destroy", () => {
      it("should delete an item in the list with the associated ID", (done) => {
        Item.all()
        .then((items) => {
          const itemCountBeforeDelete = items.length;

          expect(itemCountBeforeDelete).toBe(1);

          request.post(`${base}/${this.list.id}/destroy`, (err, res, body) => {
            List.all()
            .then((items) => {
              expect(err).toBeNull();
              expect(items.length).toBe(itemCountBeforeDelete - 1);
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
        });
      });
    });

    describe("POST /api/lists/:id/items/update", () => {
      it("should update the list with the given values", (done) => {
        const options = {
          url: `${base}/${this.list.id}/items/update`,
          form: {
            itemId: 1,
            name: "Chocolate",
            quantity: 1,
            price: 5.50
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Item.findOne({
            where: {id:this.list.id}
          })
          .then((item) => {
            expect(err).toBeNull();
            expect(item.name).toBe("Chocolate");
            expect(item.quantity).toBe(1);
            expect(item.price).toBe(5.50);
            expect(item.checked).toBe(false);
            expect(item.listId).toBe(1);
            done();
          });
        });
      });
    });

  });

});
