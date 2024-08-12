import sampleMiddleware, { type SampleEnv } from "@/middlewares/sample";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { z } from "zod";

const schema = z.object({ id: z.string() });

const handler = createFactory<SampleEnv>().createHandlers(
  sampleMiddleware,
  zValidator("param", schema),
  async (c) => {
    console.info(c.var.sample);
    const { id } = c.req.valid("param");
    return c.json({
      message: `Hello, ${id}!`,
    });
  },
);

export default handler;
