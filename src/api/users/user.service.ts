// Example: src/api/users/user.service.ts
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/errors/api-error';

const prisma = new PrismaClient();

const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullname: true,
      profilePicture: true,
      createdAt: true,
    },
  });
};

export default {
  getUsers,
  // other methods...
};
