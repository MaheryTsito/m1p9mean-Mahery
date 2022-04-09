import * as env from "env-var";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const config = {
  server: {
    port: env.get("NODE_PORT").required().asIntPositive(),
  },
  mongodb: {
    dbURI: env.get("DB_CONNECT_STRING").required().asString(),
  },
};
