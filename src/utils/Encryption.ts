import * as crypto from 'crypto';

const hash = 'sha512';
const encoding = 'base64';

const hashPwd = (pwd: string): string => {
  return crypto.createHash(hash).update(pwd).digest(encoding);
};

export default { hashPwd };
