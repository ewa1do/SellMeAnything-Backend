import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { filePromise, DataRequest } from './utils';

const app: Application = express();

const HOST = '127.0.0.1';
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.get('/api/v1/product', async (_, res: Response): Promise<void> => {
  try {
    const data: any = await filePromise(
      `${__dirname}/data/products-with-uuid.json`
    );
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

app.get(
  '/api/v1/product/:id',
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const data: unknown = await filePromise(
        `${__dirname}/data/products-with-uuid.json`
      );

      if (typeof data === 'string') {
        const dataParsed: DataRequest[] = JSON.parse(data);

        const product = dataParsed.find((prod) => prod.id === id);

        res.status(200).json({
          status: 'success',
          data: product,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error,
      });
    }
  }
);

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

app.listen(PORT, HOST, () => {
  console.log(`Server Running on port ${PORT}`);
});
