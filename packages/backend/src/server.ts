import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import cors from 'cors';
import { initDatabase } from 'src/init';
import { loggerOnlyGlobal } from 'src/logs';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(json());

app.get('/', (req: Request, res: Response) => {
	return res.send('API');
});

const logger = loggerOnlyGlobal(__filename);

httpServer.listen(process.env.PORT, () =>
	logger.info(`Server started on: ${process.env.DOMAIN}`)
);

initDatabase();
