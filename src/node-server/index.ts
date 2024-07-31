import app from "@/app";
import { serve } from "@hono/node-server";

type Env = {
  PORT: number;
};

export default async (env: Env): Promise<void> => {
  const { PORT: port } = env;
  console.info(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
};
