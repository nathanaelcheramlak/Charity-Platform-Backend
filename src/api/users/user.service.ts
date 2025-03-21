import { ApiError } from '@/utils/errors/api-error';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserService {
  static async getMe(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullname: true,
        phone: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
      return;
    }

    return user;
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        email: true,
        phone: true,
        profilePicture: true,
      },
    });
    if (!user) {
      throw ApiError.notFound('User not found');
      return;
    }

    return user;
  }

  static async updateUser(id: string, data: any) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    if (!user) {
      throw ApiError.notFound('User not found');
      return;
    }

    return user;
  }

  static async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    });
  }
}
