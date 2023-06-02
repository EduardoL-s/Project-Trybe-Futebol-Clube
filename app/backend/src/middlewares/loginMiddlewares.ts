import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/auth';

function bodyLoginVerify(req: Request, res: Response, next: NextFunction) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
}

function tokenLoginVerify(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    validateToken(authorization);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export { bodyLoginVerify, tokenLoginVerify };
