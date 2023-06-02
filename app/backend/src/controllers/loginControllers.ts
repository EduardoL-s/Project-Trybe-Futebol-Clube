import { Request, Response } from 'express';
import loginService from '../services/loginService';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await loginService.loginAuthenticate(email, password);
  return res.status(result.status).json(result.message);
}

export default { login };
