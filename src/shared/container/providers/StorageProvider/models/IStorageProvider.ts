import { ObjectCannedACL, PutObjectCommandOutput } from "@aws-sdk/client-s3";

export interface IFile {
  filename: string;
  fieldname: string;
  mimetype: string;
  file: any

  // Private or Public
  acl: ObjectCannedACL
}

interface SaveFile {
  acl: ObjectCannedACL;
  fieldname: string;
  filename: string
}

export default interface IStorageProvider {
  saveFile(file: SaveFile, folder?: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
