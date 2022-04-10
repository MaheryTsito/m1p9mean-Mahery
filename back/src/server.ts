import { app } from "./app/app.main";
import { config } from "./app/app.config";
import { database } from "./app/app.database";

console.log("Starting E-kaly application...");
database.connect(async () => {
  const server = app.init(+process.env.PORT || config.server.port);
});
