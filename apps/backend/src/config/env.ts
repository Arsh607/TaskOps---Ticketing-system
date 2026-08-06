import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';

const backendEnvPath = fileURLToPath(new URL('../../.env', import.meta.url));

config({ path: [backendEnvPath, '.env'], quiet: true });

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const clerkConfig = {
  publishableKey: requireEnvironmentVariable('CLERK_PUBLISHABLE_KEY'),
  secretKey: requireEnvironmentVariable('CLERK_SECRET_KEY'),
};
