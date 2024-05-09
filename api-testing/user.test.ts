import axios from "axios";
import jsonData from "../api-data.json";
import { fakerEN } from "@faker-js/faker";
import { ApiControllers } from "./controller";

let fUserName = fakerEN.person.firstName();
let fLastName = fakerEN.person.lastName();
let fPhoneNumber = fakerEN.phone.number();

describe("tests for users", () => {
  const controllers = new ApiControllers();
  const apiClient = axios.create({
    baseURL: `${jsonData.baseUrl}`,
  });
  apiClient.interceptors.request.use(function (config) {
    console.log("Request URL:", `${config.baseURL}${config.url}`);
    return config;
  });

  test("GET current user", async () => {
    let currentUserData = await apiClient
      .get(`/user/me`, {
        headers: { Authorization: `Bearer ${jsonData.token}` },
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
      });
  });

  test("GET current user with try/catch", async () => {
    try {
      await axios
        .get(`${jsonData.baseUrl}/userRRR/me`, {
          headers: { Authorization: `Bearer ${jsonData.token}` },
        })
        .catch((err) => {
          if (err.response.status == 404) {
            throw new Error("Opa 404 error");
          }
          throw err;
        });
    } catch (err) {
      console.log(err);
    }
  });

  test("GET current user with expect", async () => {
    let responseT = await axios.get(`${jsonData.baseUrl}/userRRR/me`, {
      headers: { Authorization: `Bearer ${jsonData.token}` },
    });
    expect(responseT.status).toBe(200);
  });

  test("PUT user data", async () => {
    let put_user = await axios.put(
      `${jsonData.baseUrl}/users/4`,
      {
        firstName: fUserName,
        lastName: fLastName,
        phone: fPhoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${jsonData.token}`,
        },
      }
    );
  });

  test("user controller", async () => {
    await controllers.getUserById("4");
  });
});
