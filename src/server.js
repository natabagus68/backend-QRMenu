import express from 'express';
import configs from './configs/index';
import routes from './routes/index';
import cors from 'cors';
import './models';



const app = express();
const { name, host, port, uriPrefix } = configs.app;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(uriPrefix, routes);

app.listen({ host, port });

console.log(`${name} is listening on ${host}:${port}${uriPrefix}`);