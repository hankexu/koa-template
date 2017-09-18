import crypto from 'crypto';

export function encrypt(val) {
  const hash = crypto.createHash('sha1');
  hash.update(val);
  return hash.digest('hex')
}

export function md5(val) {
  const hash = crypto.createHash('md5');
  hash.update(val);
  return hash.digest('hex')
}

