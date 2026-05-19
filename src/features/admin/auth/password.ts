import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);

const HASH_PREFIX = 'scrypt';
const KEY_LENGTH = 64;

export const createPasswordHash = async (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return [HASH_PREFIX, salt, derivedKey.toString('hex')].join('$');
};

export const verifyPassword = async (
  password: string,
  passwordHash: string,
) => {
  const [prefix, salt, key] = passwordHash.split('$');

  if (prefix !== HASH_PREFIX || !salt || !key) {
    return false;
  }

  const expectedKey = Buffer.from(key, 'hex');
  const actualKey = (await scrypt(
    password,
    salt,
    expectedKey.length,
  )) as Buffer;

  if (actualKey.length !== expectedKey.length) {
    return false;
  }

  return timingSafeEqual(actualKey, expectedKey);
};
