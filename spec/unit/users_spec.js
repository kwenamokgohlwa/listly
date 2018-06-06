const sequelize = require('../../server/models/index').sequelize;
const User = require("../../server/models").User;

describe("User", () => {

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

  describe("#create()", () => {

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        name: "exampleName",
        surname: "exampleSurname",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.name).toBe("exampleName");
        expect(user.surname).toBe("exampleSurname");
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        name: "exampleName",
        surname: "exampleSurname",
        email: "It's-a me, Mario!",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

  });

});
