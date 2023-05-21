import "dotenv/config";

import { ExpressServer } from "./express/express-server";

const PORT = parseInt(process.env.PORT as string) || 3000;
new ExpressServer(PORT).open();
