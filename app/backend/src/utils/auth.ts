import { SignOptions, JwtPayload, sign, verify } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;
const configJWT: SignOptions = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const generateToken = (id: number, role: string) => {
  const payload = { id, role };
  const token = sign(payload, secretKey, configJWT);
  return token;
};

const validateToken = (token: string) => {
  const validated = verify(token, secretKey);
  return validated as JwtPayload;
};

export { generateToken, validateToken };
