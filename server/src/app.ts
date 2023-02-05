import express from 'express';
import * as dotenv from 'dotenv';
import errorHandler from './middleware/error';
import connect from './db/connect';
import routes from './routes';
import cors from 'cors';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.json({
    type: ['application/json', 'text/plain'],
}))
app.use(cors());
app.use(errorHandler)
app.use('/api/v1', routes)

connect();
app.listen(port, () => {
    console.log(`[SERVER] Running on port: ${port}`);
})