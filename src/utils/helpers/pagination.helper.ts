export interface PaginationQuery {
  page?: string;
  limit?: string;
  [key: string]: unknown;
}

export const getPaginationParams = (query: PaginationQuery) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;

  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)), // 1 - 100
  };
};
