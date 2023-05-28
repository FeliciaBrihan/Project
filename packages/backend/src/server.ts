import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import cors from 'cors';
import { initDatabase } from 'src/init';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(json());

app.get('/', (req: Request, res: Response) => {
	return res.send('API');
});

httpServer.listen(process.env.PORT, () =>
	console.log(`Server started on: ${process.env.DOMAIN}`)
);

initDatabase();
