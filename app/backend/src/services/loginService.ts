import { compare } from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { generateToken } from '../utils/auth';

async function loginAuthenticate(email: string, password: string) {
  const user = await UserModel.findOne({ where: { email } });

  const formatEmail = /\S+@\S+\.\S+/;

  if (!formatEmail.test(email) || !user) {
    return { status: 401, message: { message: 'Invalid email or password' } };
  }

  const passwordVerify = await compare(password, user.password);

  if (password.length < 6 || !passwordVerify) {
    return { status: 401, message: { message: 'Invalid email or password' } };
  }

  const tokenGen = generateToken(user.id, user.role);
  return { status: 200, message: { token: tokenGen } };
}

export default { loginAuthenticate };
