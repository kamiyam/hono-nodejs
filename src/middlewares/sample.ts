import { createFactory } from "hono/factory";

export type SampleEnv = {
  Variables: {
    sample: string;
  };
};

const middleware = createFactory<SampleEnv>().createMiddleware(
  async (c, next) => {
    c.set("sample", "sample");
    await next();
  },
);

export default middleware;
