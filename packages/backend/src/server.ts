import { createServer } from 'http';
import express, { Response, Request } from 'express';

const app = express();
const httpServer = createServer(app);

app.get('/', (req: Request, res: Response) => {
	return res.send('API');
});

httpServer.listen(3000, () => console.log('Server started on port 3000'));
