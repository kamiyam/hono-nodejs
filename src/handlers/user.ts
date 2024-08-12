import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const handler = createFactory().createHandlers(
  zValidator("json", schema),
  async (c) => {
    const data = c.req.valid("json");
    return c.json({
      message: `name: ${data.name}, age: ${data.age}`,
    });
  },
);

export default handler;
