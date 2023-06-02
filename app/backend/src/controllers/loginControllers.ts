import { Request, Response } from 'express';
import loginService from '../services/loginService';
import { validateToken } from '../utils/auth';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await loginService.loginAuthenticate(email, password);
  return res.status(result.status).json(result.message);
}

async function loginPage(req: Request, res: Response) {
  const { authorization } = req.headers;

  if (authorization) {
    const { role: cargo } = validateToken(authorization);

    return res.status(200).json({ role: cargo });
  }
}

export default { login, loginPage };
