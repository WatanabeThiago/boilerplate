import 'dotenv/config'
import Appointment from "@modules/v1/appointments/infra/data/entities/Appointment"
import AppointmentService from "@modules/v1/appointments/infra/data/entities/AppoitmentService"
import Corporation from "@modules/v1/corporations/infra/data/entities/Corporation"
import CorporationCustomer from "@modules/v1/corporations/infra/data/entities/CorporationCustomer"
import CorporationService from "@modules/v1/corporations/infra/data/entities/CorporationService"
import CorporationStaff from "@modules/v1/corporations/infra/data/entities/CorporationStaff"
import CorporationStaffService from "@modules/v1/corporations/infra/data/entities/CorporationStaffService"
import Product from "@modules/v1/products/infra/data/entities/Product"
import Service from "@modules/v1/services/infra/data/entities/Service"
import Person from "@modules/v1/users/infra/data/entities/Person"
import RefreshToken from "@modules/v1/users/infra/data/entities/RefreshToken"
import Role from "@modules/v1/users/infra/data/entities/Role"
import User from "@modules/v1/users/infra/data/entities/User"
import UserRole from "@modules/v1/users/infra/data/entities/UserRole"
import "reflect-metadata"
import { DataSource } from "typeorm"
import path from 'path'
import CorporationProduct from '@modules/v1/corporations/infra/data/entities/CorporationProduct'
import CorporationStaffAvailability from '@modules/v1/corporations/infra/data/entities/CorporationStaffAvailability'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Product,
    UserRole,
    Role,
    Corporation,
    RefreshToken,
    Person,
    CorporationService,
    CorporationStaff,
    CorporationCustomer,
    Service,
    AppointmentService,
    Appointment,
    CorporationStaffService,
    CorporationProduct,
    CorporationStaffAvailability
  ],
  ssl: {
    rejectUnauthorized: false
  },
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: false,
})

AppDataSource.initialize()
  .then(() => {
    AppDataSource.runMigrations()
    console.log('🎲 [DATABASE] Typeorm initiazed.')
  })
  .catch((error) => console.log(error))

export default AppDataSource
