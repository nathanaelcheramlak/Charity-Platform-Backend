import { PrismaClient, Charity } from '@prisma/client';

const prisma = new PrismaClient();

interface CharityFilters {
  name?: string;
  location?: string;
}
export default class CharityService {
  // Get all charities
  static async getCharities(page: number = 1, limit: number = 15, filters: CharityFilters = {}) {
    const skip = (page - 1) * limit;

    // Build filters
    const where: any = {};
    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.location) {
      where.location = {
        contains: filters.location,
        mode: 'insensitive',
      };
    }

    // Get Charities
    const [charities, totalCount] = await Promise.all([
      prisma.charity.findMany({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          logo: true,
          coverPicture: true,
          email: true,
          phone: true,
          location: true,
          website: true,
          createdAt: true,
          _count: {
            select: {
              followers: true,
              donations: true,
              events: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.charity.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    return { charities, totalCount, totalPages };
  }

  // Get a single charity
  static async getCharity(id: string) {
    const charity = await prisma.charity.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        coverPicture: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            donations: true,
            events: true,
          },
        },
      },
    });

    return charity;
  }

  static async getCharityEvents(charityId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where: {
          charityId,
        },
        skip,
        take: limit,
        orderBy: {
          startDate: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          targetAmount: true,
          currentAmount: true,
          startDate: true,
          endDate: true,
          createdAt: true,
          _count: {
            select: {
              comments: true,
              likes: true,
              donations: true,
            },
          },
        },
      }),
      prisma.event.count({
        where: {
          charityId,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    return { events, totalCount, totalPages };
  }

  static async getMyCharity(charityId: string) {
    const charity = await prisma.charity.findUnique({
      where: { id: charityId },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        coverPicture: true,
        email: true,
        phone: true,
        location: true,
        website: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            donations: true,
            events: true,
          },
        },
      },
    });

    return charity;
  }

  static async updateMyCharity(charityId: string, charityData: Partial<Charity>) {
    const charity = await prisma.charity.update({
      where: { id: charityId },
      data: {
        ...charityData,
      },
    });

    return charity;
  }

  static async deleteMyCharity(charityId: string) {
    await prisma.charity.delete({
      where: { id: charityId },
    });
  }
}
