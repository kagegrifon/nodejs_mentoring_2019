import jwt from 'jsonwebtoken';

export const getToken = (payload: any, secret: any) => {
  return jwt.sign(payload, secret, { expiresIn: 1200 });
}
