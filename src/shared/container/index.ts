import { container } from "tsyringe";

import UsersRepository from "@modules/v1/users/infra/data/repositories/UsersRepository";
import "./providers";
import IUserRolesRepository from "@modules/v1/users/repositories/IUserRolesRepository";
import UserRolesRepository from "@modules/v1/users/infra/data/repositories/UserRolesRepository";
import IRefreshTokensRepository from "@modules/v1/users/repositories/IRefreshTokensRepository";
import RefreshTokensRepository from "@modules/v1/users/infra/data/repositories/RefreshTokensRepository";
import FontsRepository from "@modules/v1/fonts/infra/data/repositories/FontsRepository";
import IFontsRepository from "@modules/v1/fonts/repositories/IFontsRepository";
import ProductsRepository from "@modules/v1/products/infra/data/repositories/ProductsRepository";
import IProductsRepository from "@modules/v1/products/repositories/IProductsRepository";
import RolesRepository from "@modules/v1/users/infra/data/repositories/RolesRepository";
import IRolesRepository from "@modules/v1/users/repositories/IRolesRepository";
import ICorporationsRepository from "@modules/v1/corporations/repositories/ICorporationsRepository";
import IPersonsRepository from "@modules/v1/users/repositories/IPersonsRepository";
import PersonsRepository from "@modules/v1/users/infra/data/repositories/PersonsRepository";
import ICorporationServicesRepository from "@modules/v1/corporations/repositories/ICorporationServicesRepository";
import ICorporationStaffRepository from "@modules/v1/corporations/repositories/ICorporationStaffRepository";
import CorporationServicesRepository from "@modules/v1/corporations/infra/data/repositories/CorporationServicesRepository";
import CorporationStaffRepository from "@modules/v1/corporations/infra/data/repositories/CorporationStaffRepository";
import CorporationsRepository from "@modules/v1/corporations/infra/data/repositories/CorporationsRepository";
import IUsersRepository from "@modules/v1/users/repositories/IUsersRepository";
import ICorporationStaffServicesRepository from "@modules/v1/corporations/repositories/ICorporationStaffServicesRepository";
import CorporationStaffServicesRepository from "@modules/v1/corporations/infra/data/repositories/CorporationStaffServicesRepository";
import S3StorageProvider from "./providers/StorageProvider/implementations/S3StorageProvider";
import IStorageProvider from "./providers/StorageProvider/models/IStorageProvider";
import ICorporationProductsRepository from "@modules/v1/corporations/repositories/ICorporationProductsRepository";
import CorporationProductsRepository from "@modules/v1/corporations/infra/data/repositories/CorporationProductsRepository";
import ICorporationStaffAvailabilitiesRepository from "@modules/v1/corporations/repositories/ICorporationStaffAvailabilitiesRepository";
import CorporationStaffAvailabilitiesRepository from "@modules/v1/corporations/infra/data/repositories/CorporationStaffAvailabilitiesRepository";

container.registerSingleton<ICorporationStaffAvailabilitiesRepository>(
  "CorporationStaffAvailabilitiesRepository",
  CorporationStaffAvailabilitiesRepository
);

container.registerSingleton<ICorporationProductsRepository>(
  "CorporationProductsRepository",
  CorporationProductsRepository
);

container.registerSingleton<ICorporationStaffServicesRepository>(
  "CorporationStaffServicesRepository",
  CorporationStaffServicesRepository
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  S3StorageProvider
);

// container.registerSingleton<IAppointmentsRepository>(
//   'AppointmentsRepository',
//   AppointmentsRepository,
// );

// container.registerSingleton<IServicesRepository>(
//   'ServicesRepository',
//   ServicesRepository,
// );

container.registerSingleton<ICorporationStaffRepository>(
  "CorporationStaffRepository",
  CorporationStaffRepository
);
container.registerSingleton<ICorporationServicesRepository>(
  "CorporationServicesRepository",
  CorporationServicesRepository
);
container.registerSingleton<IPersonsRepository>(
  "PersonsRepository",
  PersonsRepository
);
container.registerSingleton<ICorporationsRepository>(
  "CorporationsRepository",
  CorporationsRepository
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository
);
container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IFontsRepository>(
  "FontsRepository",
  FontsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserRolesRepository>(
  "UserRolesRepository",
  UserRolesRepository
);

container.registerSingleton<IRefreshTokensRepository>(
  "RefreshTokensRepository",
  RefreshTokensRepository
);
