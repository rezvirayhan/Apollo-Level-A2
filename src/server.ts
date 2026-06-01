import app from "./app";
import config from "./config";
import { initDB } from "./db";

const port = config.port;
const main = () => {
  initDB();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
