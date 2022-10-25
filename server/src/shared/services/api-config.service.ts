import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UserSubscriber } from '../../entity-subscribers/user-subscriber';
import { SnakeNamingStrategy } from '../../snake-naming.strategy';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  private getNumber(key: string): number {
    return Number(this.configService.get(key));
  }

  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    if (module.hot) {
      const entityContext = require.context(
        './../../modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity as string;
      });
      const migrationContext = require.context(
        './../../migrations',
        false,
        /\.ts$/,
      );

      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration as string;
      });
    }
    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5423,
      username: process.env.DB_USERNAME,
      ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false
      },
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      subscribers: [UserSubscriber],
      migrationsRun: true,
      logging: this.isDevelopment,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get natsConfig() {
    return {
      host: this.getString('NATS_HOST'),
      port: this.getNumber('NATS_PORT'),
    };
  }
}
