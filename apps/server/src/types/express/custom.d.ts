import { Request } from 'express-serve-static-core';
import { User } from '@prisma/client';

export type AuthenticatedRequest = Request & {
  user: User;
};
