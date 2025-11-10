import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    // 🔧 ENV konfiguratsiya global bo‘lsin
    ConfigModule.forRoot({ isGlobal: true }),

    // 🗄 PostgreSQL ulanish
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'crm_db',
      entities: [User],
      synchronize: true,
    }),

    // 🔐 Auth (login/register)
    AuthModule,

    // 👨‍🎓 Students CRUD
    StudentsModule,

    // 👨‍🏫 Teachers CRUD
    TeachersModule,
  ],
})
export class AppModule {}
