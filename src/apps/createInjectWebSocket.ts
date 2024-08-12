import { createNodeWebSocket } from "@hono/node-ws";
import type { Hono } from "hono";
import type { WSContext } from "hono/ws";

export const createInjectWebSocket = async (app: Hono) => {
  const clients = new Set<WSContext>();
  const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });
  app.get(
    "/ws",
    upgradeWebSocket((c) => {
      console.info("Client connected");
      return {
        async onOpen(event, ws) {
          clients.add(ws);
          console.info("Client connected");
        },
        async onMessage(event, ws) {
          await Promise.all(
            Array.from(clients).map(
              (client) =>
                new Promise((resolve, reject) => {
                  if (client !== ws) {
                    client.send(`Message from client: ${event.data}`);
                  } else {
                    ws.send("Message received");
                  }
                  resolve(undefined);
                }),
            ),
          );
        },
        async onClose(event, ws) {
          console.info("Connection closed");
          clients.delete(ws);
        },
      };
    }),
  );
  return { injectWebSocket };
};
