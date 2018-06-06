const request = require("request");
const server = require("../../server/server");
const base = "http://localhost:3000/api/users";

const sequelize = require('../../server/models/index').sequelize;
const User = require("../../server/models").User;

describe("routes : users", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("POST /api/users/sign_up", () => {
    it("should create a new user with valid values and redirect", (done) => {
      const options = {
        url: `${base}/sign_up`,
        form: {
          name: "exampleName",
          surname: "exampleSurname",
          email: "user@example.com",
          password: "123456789"
        }
      }

      request.post(options, (err, res, body) => {
          User.findOne({where: {email: "user@example.com"}})
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("user@example.com");
            expect(user.name).toBe("exampleName");
            expect(user.surname).toBe("exampleSurname");
            expect(user.id).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      const options2 = {
        url: `${base}/sign_up`,
        form: {
          email: "no",
          password: "123456789"
        }
      }

      request.post(options2, (err, res, body) => {
          User.findOne({where: {email: "no"}})
          .then((user) => {
            expect(user).toBeNull();
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
