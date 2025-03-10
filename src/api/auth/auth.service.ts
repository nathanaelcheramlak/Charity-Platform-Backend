import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../config/env';
import { ApiError } from '../../utils/errors/api-error';
import { User, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RegisterUserData {
  email: string;
  fullname: string;
  phone: string;
  password: string;
}

interface TokenPayload {
  id: string;
  email: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  static async register(userData: RegisterUserData): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw ApiError.badRequest('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        fullname: userData.fullname,
        password: hashedPassword,
        phone: userData.phone,
      },
    });

    return user;
  }

  static async login(
    email: string,
    password: string,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw ApiError.badRequest('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.badRequest('Invalid credentials');
    }

    // Generate Token
    const tokens = this.generateTokens({ id: user.id, email: user.email });
    return { user, ...tokens };
  }

  private static generateTokens(payload: TokenPayload): AuthTokens {
    const accessToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: parseInt(env.JWT_ACCESS_EXPIRATION, 10),
    });

    const refreshToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: parseInt(env.JWT_REFRESH_EXPIRATION),
    });

    return { accessToken, refreshToken };
  }

  static async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verify refresh token
      const payload = jwt.verify(refreshToken, env.JWT_SECRET) as TokenPayload;

      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw ApiError.unauthorized('Invalid token');
      }

      return this.generateTokens({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }
  }
}

export default AuthService;
