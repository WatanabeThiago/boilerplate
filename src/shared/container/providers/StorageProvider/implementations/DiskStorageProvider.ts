import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider, { IFile } from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: IFile, folder?: string): Promise<string> {
    try {
      if (!fs.existsSync(uploadConfig.uploadsFolder)) {
        fs.mkdirSync(uploadConfig.uploadsFolder);
      }

      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, file.filename),
        path.resolve(uploadConfig.uploadsFolder, file.filename),
      );
    } catch (err) {
      throw new AppError('Erro ao realizar upload no disco');
    }

    return file.filename;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
