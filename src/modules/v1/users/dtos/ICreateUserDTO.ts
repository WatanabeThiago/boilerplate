import { CreateSellerDTO } from '@modules/v1/sellers/dtos/CreateSellerDTO';

export default interface ICreateUserDTO {
  id: string;
  email?: string;
  password?: string;

  personId: string
}
