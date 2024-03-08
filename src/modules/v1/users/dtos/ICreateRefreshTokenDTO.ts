export default interface ICreateRefreshTokenDTO {
  id: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
  expiresIn: number;
  isActive: boolean;
}
