// import { compare } from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { generateToken } from '../utils/auth';

async function loginAuthenticate(email: string) {
  const user = await UserModel.findOne({ where: { email } });

  if (user) {
    const tokenGen = generateToken(user.id, user.role);
    return { status: 200, message: { token: tokenGen } };
  }

  return { status: 200, message: { message: 'algo de errado' } };
}

export default { loginAuthenticate };
