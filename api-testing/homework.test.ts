import axios from "axios";
import jsonpath from "jsonpath";

const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method, config.url);
    console.log("Request Data:", config.data);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

const responseInterceptor = axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.statusText);
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

describe("tests for posts", () => {
  afterAll(() => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  });

  test("get users info", async () => {
    const all_users_response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    let userName = String(
      jsonpath.query(all_users_response.data, "$..[?(@.id==2)].name")
    );
    let userWebsite = String(
      jsonpath.query(all_users_response.data, "$..[?(@.id==2)].website")
    );
    expect(all_users_response.status).toEqual(200);
    expect(userName).toBe("Ervin Howell");
    expect(userWebsite).toBe("anastasia.net");
  });
  test("get post info", async () => {
    const all_posts_response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    let postTitle = String(
      jsonpath.query(all_posts_response.data, "$..[?(@.id==50)].title")
    );
    let postBody = String(
      jsonpath.query(all_posts_response.data, "$..[?(@.id==50)].body")
    );
    expect(all_posts_response.status).toEqual(200);
    expect(postTitle).toBe(
      "repellendus qui recusandae incidunt voluptates tenetur qui omnis exercitationem"
    );
    expect(postBody).toBe(
      "error suscipit maxime adipisci consequuntur recusandae\nvoluptas eligendi et est et voluptates\nquia distinctio ab amet quaerat molestiae et vitae\nadipisci impedit sequi nesciunt quis consectetur"
    );
  });
  test("get comments of post info", async () => {
    const all_comments_response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments?postId=50"
    );
    let commentName = String(
      jsonpath.query(all_comments_response.data, "$..[?(@.id==247)].name")
    );
    let commentEmail = String(
      jsonpath.query(all_comments_response.data, "$..[?(@.id==247)].email")
    );
    let commentBody = String(
      jsonpath.query(all_comments_response.data, "$..[?(@.id==247)].body")
    );
    expect(all_comments_response.status).toEqual(200);
    expect(commentName).toBe("vel aut blanditiis magni accusamus dolor soluta");
    expect(commentEmail).toBe("Wilbert@cheyenne.ca");
    expect(commentBody).toBe(
      "explicabo nam nihil atque sint aut\nqui qui rerum excepturi soluta quis et\net mollitia et voluptate minima nihil\nsed quaerat dolor earum tempore et non est voluptatem"
    );
  });
  test("post post info", async () => {
    const post_info_response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "hello",
        body: "Welcome",
        userId: 1,
      },
      { headers: { "Content-Type": "application/json; charset=UTF-8" } }
    );
    let postTitle = String(jsonpath.query(post_info_response.data, "$..title"));
    let postBody = String(jsonpath.query(post_info_response.data, "$..body"));
    let postId = String(jsonpath.query(post_info_response.data, "$..id"));
    let postUserId = String(
      jsonpath.query(post_info_response.data, "$..userId")
    );
    expect(post_info_response.status).toEqual(201);
    expect(postTitle).toBe("hello");
    expect(postBody).toBe("Welcome");
    expect(postUserId).toBe("1");
    expect(postId).toBe("101");
  });
  test("post user info", async () => {
    const user_info_response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      {
        name: "Ola",
        username: "Ola",
        email: "Ola@Ola.biz",
        address: {
          street: "Ola Ola",
          suite: "Ola. 556",
          city: "Ola",
          zipcode: "1111-1111",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      { headers: { "Content-Type": "application/json; charset=UTF-8" } }
    );
    // console.log(user_info_response.data);
    let userId = String(jsonpath.query(user_info_response.data, "$..id"));
    expect(user_info_response.status).toEqual(201);
    expect(userId).toBe("11");
  });
});
