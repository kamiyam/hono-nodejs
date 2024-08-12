import { createApp } from "@/apps/createApp";
import { serve } from "@hono/node-server";

type Env = {
  PORT: number;
};

export default async (env: Env): Promise<void> => {
  const { injectWebSocket, appRouter } = await createApp();

  const { PORT: port } = env;
  console.info(`Server is running on port ${port}`);

  const server = serve({
    fetch: appRouter.fetch,
    port,
  });
  injectWebSocket(server);
};
