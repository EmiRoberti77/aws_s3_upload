import express, { Request, Response } from 'express';
import { Server, Message, ROOT_ENDPOINT } from './util/Util';
import { Logger, Level } from './logger/Logger';

import { TransferService } from './service/TransferService';

// const transfer_wegmans = new TransferService({
//   Bucket: 's3-customer-sales-import',
//   Key: 'Wegmans/data3.csv',
//   Body: 'data3.csv',
//   Folder: 'Wegmans',
// });
const app = express();
app.use(express.json());

app.get(ROOT_ENDPOINT.TRANSFER, (req: Request, res: Response) => {
  res.status(200).send(
    JSON.stringify({
      message: Message.methodNotImplemented('GET'),
    })
  );
  res.end();
});

app.post(ROOT_ENDPOINT.TRANSFER, async (req: Request, res: Response) => {
  const transfer_wegmans = new TransferService(req.body);
  await transfer_wegmans.transfer();

  res.status(200).send(
    JSON.stringify({
      message: Message.success,
      body: req.body,
    })
  );
  res.end();
});

app.listen(Server.port, () => {
  Logger.log(Message.serverStarted(Server.port));
});
