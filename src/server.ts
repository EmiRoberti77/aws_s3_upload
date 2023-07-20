import { TransferService } from './service/TransferService';

// const transfer_wegmans = new TransferService({
//   Bucket: 's3-customer-sales-import',
//   Key: 'Wegmans/data3.csv',
//   Body: 'data3.csv',
//   Folder: 'Wegmans',
// });

const transfer_wegmans = new TransferService();
transfer_wegmans.transfer();
