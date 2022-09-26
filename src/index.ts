import fs from 'fs';
import http from 'http';
import express, { Response, Application } from 'express';
import cors from 'cors';

const app: Application = express();

const HOST = '127.0.0.1';
const PORT = 3000;

const filePromise = function (file: any) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      console.log('file: => ', file);
      if (error) reject('I could not found the file 😥');

      resolve(data);
    });
  });
};

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.get('/api/v1/product', async (_, res: Response): Promise<void> => {
  try {
    const data: any = await filePromise(`${__dirname}/data/products.json`);
    const body = JSON.parse(data);

    res.status(200).json({
      status: 'success',
      data: {
        body,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
});

app.get('/api/v1/user', async (_, res: Response): Promise<void> => {
  try {
    const data: any = await filePromise(`${__dirname}/data/users.json`);
    const body = JSON.parse(data);

    res.status(200).json({
      status: 'success',
      data: {
        body,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
});

// console.log(process.env);

app.listen(PORT, HOST, () => {
  console.log(`Server Running on port ${PORT}`);
});
