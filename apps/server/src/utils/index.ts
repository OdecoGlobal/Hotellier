import { User } from "@prisma/client";

export function changedPasswordAfter(
  user: User,
  JWTTimestamp: number
): boolean {
  if (user.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      user.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
}
