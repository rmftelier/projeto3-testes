import express from 'express';
import { userRoutes } from '../../app/controllers/routes/user.routes';

const app = express();
app.use(express.json()); 

app.use('/users', userRoutes); 

export default app;
