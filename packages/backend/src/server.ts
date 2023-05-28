import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(json());

app.get('/', (req: Request, res: Response) => {
	return res.send('API');
});

httpServer.listen(3000, () => console.log('Server started on port 3000'));
