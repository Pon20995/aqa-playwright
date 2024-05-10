import axios from "axios";
import { ApiControllers } from "./controller";

describe("Users test", () => {
  const controllers = new ApiControllers();

  test("Check user creation", async () => {
    const userData = {
      firstName: "Vlad",
      lastName: "Dalv",
      age: 25,
      gender: "male",
      username: "vsofronov",
    };

    let createdUser = await controllers.createUserWithCustomData(
      "https://dummyjson.com/users/add",
      userData,
      { "Content-Type": "application/json" }
    );

    expect(createdUser).toBeDefined();
    expect(createdUser.id).toEqual(101);
    expect(createdUser.firstName).toEqual("Vlad");
    expect(createdUser.lastName).toEqual("Dalv");
    expect(createdUser.age).toEqual(25);
    expect(createdUser.gender).toEqual("male");
    expect(createdUser.username).toEqual("vsofronov");
  });
});
