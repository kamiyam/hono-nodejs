import helloHandlers from "@/handlers/hello";
import userHandlers from "@/handlers/user";
import { Hono } from "hono";

const apiRouter = new Hono()
  .basePath("/api")
  .get("/hello/:id", ...helloHandlers)
  .post("/user", ...userHandlers);

export default apiRouter;
