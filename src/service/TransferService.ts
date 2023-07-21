import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { Settings, UTF8, completedFolder } from './util';

export interface ITransferServiceProps {
  Bucket: string;
  Key: string;
  Body: string;
  Folder?: string;
}

interface ICredential {
  accesskey: string;
  secretkey: string;
  endpoint: string;
  region: string;
  source_dir: string;
  bucket: string;
  folder: string;
}

export class TransferService {
  private client: S3Client;
  private clientCredential: ICredential;

  constructor() {
    this.clientCredential = this.readCredentials();
    console.log(this.clientCredential);

    this.client = new S3Client({
      region: this.clientCredential.region,
      endpoint: this.clientCredential.endpoint,
      credentials: {
        accessKeyId: this.clientCredential.accesskey,
        secretAccessKey: this.clientCredential.secretkey,
      },
    });
  }

  readCredentials(): ICredential {
    const credentials = fs.readFileSync(Settings, UTF8);
    return JSON.parse(credentials) as ICredential;
  }

  readDirFiles(): string[] {
    const files = fs.readdirSync(this.clientCredential.source_dir);
    console.log('files', files);
    return files;
  }

  async transfer(): Promise<void> {
    const files = this.readDirFiles();

    for (const file of files) {
      const params = {
        Bucket: this.clientCredential.bucket,
        Key: `${this.clientCredential.folder}/${file}`,
        Body: `${this.clientCredential.source_dir}/${file}`,
      };
      console.log('Current CSV processing', params);
      try {
        await this.client.send(new PutObjectCommand(params));
        console.log(
          `${file} has been uploaded to ${this.clientCredential.bucket}} bucket`
        );
      } catch (err) {
        console.log('err', err);
      }
    }
    return;
  }

  async listFile(): Promise<void> {
    const { folder, bucket } = this.clientCredential;
    try {
      const response = await this.client.send(
        new ListObjectsCommand({
          Bucket: bucket,
          Prefix: folder,
        })
      );

      const filenames = response.Contents?.map((item) => item.Key);
      console.log('filename', filenames);
    } catch (err) {
      console.log('err', err);
    }
    return;
  }
}
