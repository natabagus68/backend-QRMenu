import express from 'express';
import configs from './configs/index';
import routes from './routes/index';
import cors from 'cors';
import './models';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const { name, host, port, uriPrefix } = configs.app;
app.use('/image/user', express.static(__dirname + '../tempStorage/user'))
app.use('/image/company', express.static(__dirname + '../tempStorage/company'))
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(uriPrefix, routes);

app.listen({ host, port });

console.log(`${name} is listening on ${host}:${port}${uriPrefix}`);