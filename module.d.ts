declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    JWT_REFRESH: string;
  }
}
