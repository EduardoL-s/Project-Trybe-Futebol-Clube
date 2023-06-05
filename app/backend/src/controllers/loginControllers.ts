import { Request, Response } from 'express';
import loginService from '../services/loginService';
import { validateToken } from '../utils/auth';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await loginService.loginAuthenticate(email, password);
  return res.status(result.status).json(result.message);
}

async function loginPage(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const { role: cargo } = validateToken(authorization);

    return res.status(200).json({ role: cargo });
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default { login, loginPage };
