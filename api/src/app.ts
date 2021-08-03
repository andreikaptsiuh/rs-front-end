import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cards from './card/router';
import users from './users/router';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(json());
app.use(cors());
app.use('/cards', cards);
app.use('/users', users);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));