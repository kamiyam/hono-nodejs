import type apiRouter from "@/routers/api";
import { hc } from "hono/client";

const apiClient = hc<typeof apiRouter>("/");

// for client examples
apiClient.api.hello[":id"]
  .$get({
    param: { id: "hono" },
  })
  .then(async (res) => {
    if (res.ok) {
      const helloJson = await res.json();
      console.info(helloJson);
    }
  });
apiClient.api.user
  .$post({
    json: {
      name: "John",
      age: 30,
    },
  })
  .then(async (res) => {
    if (res.ok) {
      const userJson = await res.json();
      console.info(userJson);
    }
  });
