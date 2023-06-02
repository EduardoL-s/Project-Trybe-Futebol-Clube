import { Request, Response } from 'express';
import loginService from '../services/loginService';

async function login(req: Request, res: Response) {
  const { email } = req.body;
  const result = await loginService.loginAuthenticate(email);
  return res.status(result.status).json(result.message);
}

export default { login };
