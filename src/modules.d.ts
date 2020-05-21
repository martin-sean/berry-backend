declare namespace NodeJS {
  // Autocomplete environment variables
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    RT_SECRET: string;
  }
}