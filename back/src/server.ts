import { app } from "./app/app.main";
import { config } from "./app/app.config";
import { database } from "./app/app.database";

database.connect(async () => {
  const server = app.init(config.server.port);
});
