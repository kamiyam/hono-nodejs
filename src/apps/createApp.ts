import { createInjectWebSocket } from "@/apps/createInjectWebSocket";
import apiRouter from "@/routers/api";
import { Hono } from "hono";

export const createApp = async () => {
  // Hono インスタンスを作成
  const app = new Hono();
  // apiRouter(basePath("/api")) を / にマウントする => /api 以下のエンドポイントが利用可能になる
  app.route("/", apiRouter);
  // apiRouter 以外で指定しても動作する
  app.get("/api/sample", async (c) => {
    return c.json({
      message: "Hello from Hono!",
    });
  });
  // WebSocket のインジェクションを行う
  const { injectWebSocket } = await createInjectWebSocket(app);
  return { appRouter: app, injectWebSocket };
};
