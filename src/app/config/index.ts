import 'dotenv/config';

const env = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

export default {
  APP_NAME: env('APP_NAME', 'App'),
  PORT: env('PORT', '3000'),
  LOCALE: env('LOCALE', 'es-CL'),
  TIME_ZONE: env('TIME_ZONE', 'America/Santiago'),
  DATABASES: {
    CR_MASTER: {
      TYPE: env('CR_MASTER_TYPE', 'mssql'),
      HOST: env('CR_MASTER_HOST', ''),
      PORT: env('CR_MASTER_PORT', ''),
      USERNAME: env('CR_MASTER_USERNAME', ''),
      PASSWORD: env('CR_MASTER_PASSWORD', ''),
      DATABASE: env('CR_MASTER_DATABASE', ''),
    },
    INFOCALL: {
      TYPE: env('INFOCALL_TYPE', 'mysql'),
      HOST: env('INFOCALL_HOST', ''),
      PORT: env('INFOCALL_PORT', ''),
      USERNAME: env('INFOCALL_USERNAME', ''),
      PASSWORD: env('INFOCALL_PASSWORD', ''),
      DATABASE: env('INFOCALL_DATABASE', ''),
    },
    SCORING: {
      TYPE: env('SCORING_TYPE', 'mongodb'),
      HOST: env('SCORING_HOST', ''),
    },
  },
  REDIS: {
    HOST: env('REDIS_HOST', ''),
    PORT: Number(env('REDIS_PORT', '')),
  },
};
