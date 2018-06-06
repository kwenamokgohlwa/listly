const request = require("request");
const server = require("../../server/server");
const base = "http://localhost:3000/api/lists";

const sequelize = require('../../server/models/index').sequelize;
const List = require("../../server/models").List;
const User = require("../../server/models").User;

const app = require('../../app');
const http = require('http').createServer(app).listen(3000); //Get the server running for test

describe("routes : lists", () => {

  beforeEach((done) => { // before each context
    this.user;
    this.list;   // define variables and bind to context

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
          this.list = list;  // store resulting list in context
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      });
    });
  });

  describe("user performing CRUD actions for Lists", () => {

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

    describe("GET /api/lists/show", () => {
      it("should respond with all lists", (done) => {
        request.get(`${base}/show`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Groceries");
          done();
        });
      });
    });

    describe("POST /api/lists/create", () => {
      const options = {
        url: `${base}/create`,
        form: {
          name: "Clothing",
        }
      };

      it("should create a new List and redirect to /lists", (done) => {
        request.post(options, (err, res, body) => {
          List.findOne({where: {name: "Clothing"}})
          .then((list) => {
            expect(err).toBeNull();
            expect(list.name).toBe("Clothing");
            expect(list.userId).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });

    describe("POST /api/lists/:id/destroy", () => {
      it("should delete the list with the associated ID", (done) => {
        List.all()
        .then((lists) => {
          const listCountBeforeDelete = lists.length;

          expect(listCountBeforeDelete).toBe(1);

          request.post(`${base}/${this.list.id}/destroy`, (err, res, body) => {
            List.all()
            .then((lists) => {
              expect(err).toBeNull();
              expect(lists.length).toBe(listCountBeforeDelete - 1);
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

    describe("POST /api/lists/:id/update", () => {
      it("should update the list with the given values", (done) => {
        const options = {
          url: `${base}/${this.list.id}/update`,
          form: {
            name: "Christmass Shopping"
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          List.findOne({
            where: {id:this.list.id}
          })
          .then((list) => {
            expect(err).toBeNull();
            expect(list.name).toBe("Christmass Shopping");
            done();
          });
        });
      });
    });

  });

});
