export const getRequiredServerEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const getOptionalServerEnv = (key: string, fallback: string) =>
  process.env[key] ?? fallback;
