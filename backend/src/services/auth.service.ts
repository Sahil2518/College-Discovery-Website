import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { SALT_ROUNDS, JWT_EXPIRY } from '../utils/constants';
import { RegisterInput, LoginInput } from '../validators/auth.validator';

const userRepo = new UserRepository();

export class AuthService {
  async register(input: RegisterInput) {
    const existing = await userRepo.findByEmail(input.email);
    if (existing) throw ApiError.conflict('Email already registered');

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await userRepo.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const token = this.generateToken(user.id);
    return { user, token };
  }

  async login(input: LoginInput) {
    const user = await userRepo.findByEmail(input.email);
    if (!user) throw ApiError.unauthorized('Invalid email or password');

    const validPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!validPassword) throw ApiError.unauthorized('Invalid email or password');

    const token = this.generateToken(user.id);
    return {
      user: { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
      token,
    };
  }

  async getProfile(userId: number) {
    const user = await userRepo.findById(userId);
    if (!user) throw ApiError.notFound('User');
    return user;
  }

  private generateToken(userId: number): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', {
      expiresIn: JWT_EXPIRY,
    });
  }
}
