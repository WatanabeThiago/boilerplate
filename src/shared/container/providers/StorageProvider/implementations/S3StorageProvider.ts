import fs from 'fs';
import path from 'path';
import { format } from 'date-fns'
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider, { IFile } from '../models/IStorageProvider';
import env from '@config/env'
import { DeleteObjectCommand, PutObjectCommand, PutObjectCommandOutput, S3, S3Client } from '@aws-sdk/client-s3';

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: "https://nyc3.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
      forcePathStyle: false, // Configures to use subdomain/virtual calling format.
      region: "us-east-1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });
  }
  public async saveFile(file: IFile, folder: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file.filename);

    const ContentType = 'image';

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    file.filename = `${format(new Date(), 'yyyy-MM-ddmmss')}${file.filename.replace(/\s+/g, '')}`;

    try {
      const params = {
        Bucket: env.STORAGE_BUCKET_NAME, // The path to the directory you want to upload the object to, starting with your Space name.
        Key: `${folder}/${file.filename}`, // Object key, referenced whenever you want to access this file later.
        Body: fileContent, // The object's contents.
        ACL: file.acl, // Defines ACL permissions, such as private or public.
      };
      await this.client.send(new PutObjectCommand(params));

      return `${folder}/${file.filename}`
    } catch (err) {
      throw new AppError('Erro ao realizar upload na Amazon');
    }
  }

  public async deleteFile(file: string): Promise<void> {
    try {
      const params = {
        Bucket: env.STORAGE_BUCKET_NAME, // Your bucket name
        Key: file, // The key of the file you want to delete
      };

      await this.client.send(new DeleteObjectCommand(params));
    } catch (err) {
      throw new AppError(`Error while deleting file from S3: ${err.message}`);
    }
  }
}

export default S3StorageProvider;
