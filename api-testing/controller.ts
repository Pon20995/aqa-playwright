import axios from "axios";

export class ApiControllers {
  async getUserById(userId: any) {
    let r = await axios.get(`https://dummyjson.com/users/${userId}`);
    expect(r.status).toBe(200);
  }

  async createUserWithCustomData(url: any, userData: any, headers: any) {
    const response = await axios.post(url, userData, { headers });
    return response.data;
  }
}
