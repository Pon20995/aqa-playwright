import axios from "axios";

async function checkWithInvalidData(invalidUrl: any) {
  try {
    const response = await axios.get(`${invalidUrl}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
}

describe("Check if the error right", () => {
  test("handles errors for invalid URL", async () => {
    const errorMessage = await checkWithInvalidData(
      "https://dummyjson.com/nonexistent"
    );
    expect(errorMessage).toEqual("not found!");
  });
});
