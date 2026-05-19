/* eslint-disable no-console */
import { existsSync, readFileSync } from 'fs';
import { spawn } from 'child_process';

const ENV_FILE = '.env.local';

const parseEnvValue = (value) => {
  const trimmedValue = value.trim();
  const firstCharacter = trimmedValue[0];
  const lastCharacter = trimmedValue[trimmedValue.length - 1];

  if (
    (firstCharacter === '"' && lastCharacter === '"') ||
    (firstCharacter === "'" && lastCharacter === "'")
  ) {
    return trimmedValue.slice(1, -1).replace(/\\n/g, '\n');
  }

  return trimmedValue;
};

const loadLocalEnv = () => {
  if (!existsSync(ENV_FILE)) {
    return {};
  }

  return readFileSync(ENV_FILE, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return env;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1);

      return {
        ...env,
        [key]: parseEnvValue(value),
      };
    }, {});
};

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error(
    'Missing command. Example: node scripts/load-env.mjs prisma generate',
  );
  process.exit(1);
}

const child = spawn(command, args, {
  env: {
    ...process.env,
    ...loadLocalEnv(),
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
